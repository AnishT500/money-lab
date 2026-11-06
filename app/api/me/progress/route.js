import {database} from '../../../../lib/firebase-admin.js';
import {body,endpoint,json,rateLimit,requireUser} from '../../../../lib/api.js';
import {progressInput} from '../../../../lib/validation.js';
import {FieldValue} from 'firebase-admin/firestore';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export const PUT=endpoint(async request=>{
  const user=await requireUser(request),value=progressInput(await body(request));
  await rateLimit(user.uid,'progress',60);
  await database().collection('users').doc(user.uid).collection('private').doc('progress').set({value,updatedAt:FieldValue.serverTimestamp()});
  return json({saved:true});
});
