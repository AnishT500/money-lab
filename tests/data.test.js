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
