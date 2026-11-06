'use client';
import {getApps,initializeApp} from 'firebase/app';
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged} from 'firebase/auth';
const config={
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
export function clientAuth(){
  if(!config.apiKey||!config.authDomain||!config.projectId||!config.appId)return null;
  return getAuth(getApps().length?getApps()[0]:initializeApp(config));
}
export function googleSignIn(){
  const auth=clientAuth();
  if(!auth)return Promise.reject(new Error('Google sign-in is being set up. You can keep learning as a guest.'));
  const provider=new GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  return signInWithPopup(auth,provider).catch(error=>{
    if(error.code==='auth/popup-closed-by-user')return;
    if(error.code==='auth/popup-blocked')throw new Error('Allow the Google sign-in popup, then try again.');
    if(error.code==='auth/unauthorized-domain')throw new Error('Google sign-in is not enabled for this address yet.');
    throw new Error('Could not sign in with Google. Please try again.');
  });
}
export function googleSignOut(){const auth=clientAuth();return auth?signOut(auth):Promise.resolve();}
export function observeUser(callback){const auth=clientAuth();if(!auth){callback(null);return ()=>{};}return onAuthStateChanged(auth,callback);}
export async function api(path,{body,...options}={}){
  const user=clientAuth()?.currentUser;
  const headers={'Content-Type':'application/json',...options.headers};
  if(user)headers.Authorization='Bearer '+await user.getIdToken();
  const response=await fetch(path,{...options,headers,body:body===undefined?undefined:JSON.stringify(body),cache:'no-store'});
  const result=await response.json().catch(()=>({error:'The server did not respond. Please try again.'}));
  if(!response.ok)throw new Error(result.error||'Could not save. Please try again.');
  return result;
}
