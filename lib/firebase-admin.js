import 'server-only';
import {cert,getApps,initializeApp} from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';
import {getFirestore} from 'firebase-admin/firestore';
export function adminApp(){
  const existing=getApps().find(app=>app.name==='money-lab');
  if(existing)return existing;
  const raw=process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if(!raw){const error=new Error('Firebase server configuration is missing.');error.status=503;throw error;}
  return initializeApp({credential:cert(JSON.parse(raw)),projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID},'money-lab');
}
export const database=()=>getFirestore(adminApp());
export const adminAuth=()=>getAuth(adminApp());
