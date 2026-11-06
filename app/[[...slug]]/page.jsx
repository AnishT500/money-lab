import {notFound} from 'next/navigation';
import MoneyLab from '../../components/MoneyLab.jsx';
import {routePaths,validPath,routeFor} from '../../lib/routes.js';
export const revalidate = 3600;
export function generateStaticParams(){
  return Object.values(routePaths).map(path=>({slug:path==='/'?[]:path.slice(1).split('/')}));
}
export async function generateMetadata({params}){
  const {slug=[]}=await params;
  const name=routeFor('/'+slug.join('/'));
  const titles={home:'Financial literacy for students',overview:'Your first paycheck',summary:'Activity summary',lessons:'Learn',community:'Community',notebook:'Your progress',practice:'Practice',internship:'Internship field guide',quiz:'Paycheck quiz',lesson:'Your first paycheck',saving:'Saving',credit:'Credit'};
  return {title:titles[name]||'Money Lab'};
}
export default async function Page({params}){
  const {slug=[]}=await params;
  if(!validPath('/'+slug.join('/')))notFound();
  return <MoneyLab/>;
}
