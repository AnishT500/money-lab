import {questions} from './quiz.js';
export class HttpError extends Error{constructor(status,message){super(message);this.status=status;}}
export const topics=['Budgeting','First paycheck','Saving','Credit'];
export function text(value,min,max,label){
  if(typeof value!=='string'||value.trim().length<min||value.trim().length>max)throw new HttpError(400,`${label} must be ${min}–${max} characters.`);
  return value.trim();
}
export function postInput(value){
  if(!topics.includes(value?.topic))throw new HttpError(400,'Choose a valid topic.');
  return {title:text(value.title,8,160,'Question'),body:text(value.body,10,3000,'Context'),topic:value.topic};
}
export function attemptInput(value){
  if(!Array.isArray(value?.answers)||value.answers.length!==5||value.answers.some(v=>!Number.isInteger(v)||v<0||v>3))throw new HttpError(400,'Submit one valid answer for each of the five questions.');
  return value.answers;
}
export function progressInput(value){
  if(!value||typeof value!=='object')throw new HttpError(400,'Invalid progress.');
  const allowed=['lesson','quiz','lab','scenarios','saving','credit'];
  const budget={};
  for(const key of ['needs','wants','savings']){
    const amount=value.budget?.[key];
    if(!Number.isInteger(amount)||amount<0||amount>800)throw new HttpError(400,'Invalid budget amount.');
    budget[key]=amount;
  }
  if(!Array.isArray(value.completed)||value.completed.some(v=>!allowed.includes(v)))throw new HttpError(400,'Invalid completed activity.');
  if(!Array.isArray(value.checks)||value.checks.some(v=>!Number.isInteger(v)||v<0||v>8))throw new HttpError(400,'Invalid checklist.');
  if(value.scenario!==null&&!['save','split','spend'].includes(value.scenario))throw new HttpError(400,'Invalid scenario.');
  let scenarioBase=null;
  if(value.scenarioBase!==null&&value.scenarioBase!==undefined){
    scenarioBase={};
    for(const key of ['needs','wants','savings']){
      const amount=value.scenarioBase[key];
      if(!Number.isInteger(amount)||amount<0||amount>800)throw new HttpError(400,'Invalid scenario budget.');
      scenarioBase[key]=amount;
    }
    if(Object.values(scenarioBase).reduce((a,b)=>a+b,0)!==800)throw new HttpError(400,'Scenario budget must total $800.');
  }
  let quizResult=null;
  if(value.quizResult){const answers=attemptInput(value.quizResult);quizResult={answers,score:answers.filter((answer,i)=>answer===questions[i].correct).length};}
  return {completed:[...new Set(value.completed)],budget,checks:[...new Set(value.checks)],scenario:value.scenario,scenarioBase,quizResult};
}
export function documentId(value){
  if(typeof value!=='string'||!/^[a-zA-Z0-9_-]{1,128}$/.test(value))throw new HttpError(400,'Invalid discussion.');
  return value;
}
