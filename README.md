# Money Lab

A financial literacy website for students, with short lessons and activities about paychecks, budgeting, saving, and credit.

[Visit Money Lab](https://money-lab-purdue.vercel.app)

## Features

- Paycheck lessons and quizzes
- Interactive budget and expense scenarios
- Internship checklist
- Community questions and replies
- Google sign-in with saved progress

## Run locally

Use Node.js 22 or newer. Copy `.env.example` to `.env.local` and add your Firebase settings.

```sh
npm install
npm run dev
```

Open http://localhost:3000.

```sh
npm test       # Run tests
npm run build # Build for production
```

Keep the Firebase service account key in `.env.local` or Vercel's environment variables. Do not commit it to GitHub.

## Stack

Next.js and Node.js, hosted on Vercel. Firebase Authentication handles sign-in, and Firestore stores user progress, quiz results, and forum posts.
