import 'server-only';
import {adminAuth,database} from './firebase-admin.js';
import {HttpError} from './validation.js';
import {FieldValue} from 'firebase-admin/firestore';
export function json(data,status=200,publicCache=false){
  return Response.json(data,{status,headers:{'Cache-Control':publicCache?'public, max-age=0, s-maxage=15, stale-while-revalidate=30':'private, no-store'}});
}
export function endpoint(handler){return async(...args)=>{try{return await handler(...args);}catch(error){
  if(error.status)return json({error:error.status===503?'This service is being set up. Please try again later.':error.message},error.status);
  console.error('Money Lab API error',error.code||error.name);
  return json({error:'Could not complete this request. Please try again.'},500);
}};}
export async function body(request){
  if(Number(request.headers.get('content-length')||0)>16000)throw new HttpError(413,'Request is too large.');
  const raw=await request.text();
  if(raw.length>16000)throw new HttpError(413,'Request is too large.');
  try{return JSON.parse(raw);}catch{throw new HttpError(400,'Invalid JSON.');}
}
export async function requireUser(request){
  const token=request.headers.get('authorization')?.match(/^Bearer (.+)$/)?.[1];
  if(!token)throw new HttpError(401,'Sign in with Google to continue.');
  const auth=adminAuth();
  let user;
  try{user=await auth.verifyIdToken(token,true);}catch{throw new HttpError(401,'Your sign-in expired. Please sign in again.');}
  if(user.firebase?.sign_in_provider!=='google.com'||!user.email_verified)throw new HttpError(403,'Use a verified Google account.');
  return user;
}
export async function ensureUser(user){
  const ref=database().collection('users').doc(user.uid);
  await database().runTransaction(async transaction=>{
    const doc=await transaction.get(ref);
    if(!doc.exists)transaction.create(ref,{name:user.name||'Learner',email:user.email,image:user.picture||null,createdAt:FieldValue.serverTimestamp(),updatedAt:FieldValue.serverTimestamp()});
  });
  return ref;
}
export async function rateLimit(userId,action,max=10){
  const ref=database().collection('_rateLimits').doc(`${userId}_${action}`);
  await database().runTransaction(async tx=>{
    const doc=await tx.get(ref),data=doc.data(),now=Date.now();
    const active=data&&now-data.windowStart<60000;
    if(active&&data.count>=max)throw new HttpError(429,'Please wait a minute before trying again.');
    tx.set(ref,{windowStart:active?data.windowStart:now,count:active?data.count+1:1});
  });
}
export function publicPost(doc){const d=doc.data();return {id:doc.id,title:d.title,body:d.body,topic:d.topic,author:d.author,authorId:d.authorId,time:d.createdAt?.toDate().toLocaleDateString('en-US')||'Just posted'};}
export function publicReply(doc){const d=doc.data();return {id:doc.id,author:d.author,body:d.body,sample:false};}
