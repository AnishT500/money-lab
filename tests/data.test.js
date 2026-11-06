import test from 'node:test';
import assert from 'node:assert/strict';
import {attemptInput,postInput,progressInput,documentId} from '../lib/validation.js';
import {pathFor,routeFor,validPath} from '../lib/routes.js';
test('routes are real paths and discussion ids cannot escape the route',()=>{
 assert.equal(pathFor('lesson'),'/learn/paycheck');
 assert.equal(pathFor('thread?sample-1'),'/community/discussion/sample-1');
 assert.equal(routeFor('/community/discussion/sample-1'),'thread');
 assert.equal(validPath('/api/me'),false);
 assert.throws(()=>documentId('../users'));
});
test('forum validation strips extra fields and rejects invalid topics and lengths',()=>{
 assert.deepEqual(postInput({title:'A valid question',body:'A little context here',topic:'Saving',authorId:'someone-else'}),{title:'A valid question',body:'A little context here',topic:'Saving'});
 assert.throws(()=>postInput({title:'short',body:'x',topic:'Saving'}));
 assert.throws(()=>postInput({title:'A valid question',body:'A little context here',topic:'Other'}));
});
test('quiz rejects incomplete and fabricated choices',()=>{
 assert.deepEqual(attemptInput({answers:[0,1,2,1,2]}),[0,1,2,1,2]);
 for(const answers of [[0],[-1,1,2,1,2],[0,1,2,1,4],[0,1,2,1,1.5]])assert.throws(()=>attemptInput({answers}));
});
test('progress validates balances and removes arbitrary fields',()=>{
 const input={completed:['lesson'],budget:{needs:400,wants:200,savings:200},checks:[1],scenario:null,scenarioBase:null,quizResult:null,userId:'other'};
 assert.equal(progressInput(input).userId,undefined);
 assert.throws(()=>progressInput({...input,budget:{needs:-1,wants:200,savings:200}}));
 assert.throws(()=>progressInput({...input,scenarioBase:{needs:400,wants:200,savings:201}}));
 assert.throws(()=>progressInput({...input,checks:[10]}));
});

test('progress writes stay ordered across page changes and retain their original payload',async()=>{
 const {queueProgressSave,waitForProgressSave}=await import('../lib/legacy-app.js');
 let release;const gate=new Promise(resolve=>{release=resolve});const writes=[];
 const readUser=()=>({uid:'learner'});
 const first=queueProgressSave('learner',readUser,async progress=>{await gate;writes.push(progress);},{completed:['lesson']});
 const snapshot={completed:['lesson','quiz']};
 const second=queueProgressSave('learner',readUser,async progress=>{writes.push(progress);},snapshot);
 snapshot.completed.push('lab');release();await Promise.all([first,second]);await waitForProgressSave();
 assert.deepEqual(writes,[{completed:['lesson']},{completed:['lesson','quiz']}]);
 let called=false;await queueProgressSave('previous-user',readUser,async()=>{called=true;},{});
 assert.equal(called,false);
 await assert.rejects(queueProgressSave('learner',readUser,async()=>{throw Error('offline');},{}));
 await queueProgressSave('learner',readUser,async()=>{called=true;},{});
 assert.equal(called,true);
});
