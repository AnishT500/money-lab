import {cert,initializeApp} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';
import {questions,quizId} from '../lib/quiz.js';
if(!process.env.FIREBASE_SERVICE_ACCOUNT_JSON)throw new Error('Set FIREBASE_SERVICE_ACCOUNT_JSON before seeding.');
const app=initializeApp({credential:cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON))});
const db=getFirestore(app);
await db.collection('quizzes').doc(quizId).set({title:'Your first paycheck',version:1,questions});
console.log('Seeded quizzes/first-paycheck. Users and forum records are created when people sign in and post.');
await db.terminate();
