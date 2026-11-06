'use client';
import {useEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {AnimatedIcon} from './AnimatedIcon.jsx';
import {usePathname,useRouter} from 'next/navigation';
import {mountMoneyLab} from '../lib/legacy-app.js';
import {api,observeUser,googleSignIn,googleSignOut} from '../lib/firebase-client.js';
import {pathFor} from '../lib/routes.js';
export default function MoneyLab(){
  const pathname=usePathname(),router=useRouter(),mounted=useRef(null),user=useRef(null);
  const [iconTargets,setIconTargets]=useState([]);
  useEffect(()=>{
    mounted.current=mountMoneyLab({navigate:path=>router.push(path),api,getUser:()=>user.current,signIn:googleSignIn,signOut:googleSignOut,onRender:setIconTargets});
    const unsubscribe=observeUser(value=>{user.current=value;mounted.current?.accountChanged(value);});
    if(window.location.hash&&window.location.hash!=='#main')router.replace(pathFor(window.location.hash.slice(1)));
    return ()=>{unsubscribe();mounted.current?.destroy();mounted.current=null;};
  },[router]);
  useEffect(()=>{mounted.current?.routeChanged();},[pathname]);
  return <>
    <a href="#main" className="skip">Skip to content</a>
    <div id="app"><main className="wrap reading-page"><p className="eyebrow">MONEY LAB</p><h1>Money Lab</h1><p>Loading your activity…</p></main></div>
    <div id="toast" role="status" className="toast" hidden/>
    <dialog id="info-dialog" aria-labelledby="dialog-title"><div id="dialog-content"/><form method="dialog"><button className="btn">Got it</button></form></dialog>
    <noscript>Enable JavaScript to explore the interactive lessons and sign in.</noscript>
    {iconTargets.map(({element,name,key})=>createPortal(<AnimatedIcon target={element} name={name}/>,element,key))}
  </>;
}
