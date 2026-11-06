import {database} from '../../../lib/firebase-admin.js';
import {body,endpoint,json,publicPost,rateLimit,requireUser} from '../../../lib/api.js';
import {postInput} from '../../../lib/validation.js';
import {Timestamp} from 'firebase-admin/firestore';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export const GET=endpoint(async()=>{
  const snapshot=await database().collection('forumMessages').orderBy('createdAt','desc').limit(50).get();
  return json({posts:snapshot.docs.map(publicPost)},200,true);
});
export const POST=endpoint(async request=>{
  const user=await requireUser(request),input=postInput(await body(request));
  await rateLimit(user.uid,'post',5);
  const ref=database().collection('forumMessages').doc();
  await ref.create({...input,author:user.name||'Learner',authorId:user.uid,createdAt:Timestamp.now()});
  return json(publicPost(await ref.get()),201);
});
