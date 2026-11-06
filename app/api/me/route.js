import {database} from '../../../lib/firebase-admin.js';
import {endpoint,ensureUser,json,requireUser} from '../../../lib/api.js';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export const GET=endpoint(async request=>{
  const user=await requireUser(request);
  await ensureUser(user);
  const doc=await database().collection('users').doc(user.uid).collection('private').doc('progress').get();
  return json({user:{id:user.uid,name:user.name},progress:doc.exists?doc.data().value:null});
});
