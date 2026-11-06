import {database} from '../../../../../lib/firebase-admin.js';
import {body,endpoint,json,publicPost,publicReply,rateLimit,requireUser} from '../../../../../lib/api.js';
import {documentId,HttpError,text} from '../../../../../lib/validation.js';
import {Timestamp} from 'firebase-admin/firestore';
export const runtime='nodejs';
export const dynamic='force-dynamic';
async function discussion(id){
  const ref=database().collection('forumMessages').doc(id),doc=await ref.get();
  if(!doc.exists&&!['sample-1','sample-2','sample-3'].includes(id))throw new HttpError(404,'Discussion not found.');
  return {ref,doc};
}
export const GET=endpoint(async(request,{params})=>{
  const {id}=await params;
  const {ref,doc}=await discussion(documentId(id));
  const replies=await ref.collection('replies').orderBy('createdAt','asc').limit(100).get();
  return json({post:doc.exists?publicPost(doc):null,replies:replies.docs.map(publicReply)},200,true);
});
export const POST=endpoint(async(request,{params})=>{
  const user=await requireUser(request),{id}=await params;
  const reply=text((await body(request))?.body,3,3000,'Reply');
  const {ref}=await discussion(documentId(id));
  await rateLimit(user.uid,'reply',10);
  const result=ref.collection('replies').doc();
  await result.create({body:reply,author:user.name||'Learner',authorId:user.uid,createdAt:Timestamp.now()});
  return json(publicReply(await result.get()),201);
});
