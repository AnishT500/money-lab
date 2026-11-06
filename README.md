# Money Lab

A student financial literacy website built with Next.js, Node.js API routes, Firebase Authentication, and Cloud Firestore. The original design and Stub mascot are retained.

## Development

Use Node.js 22 or 24. Run npm install, copy .env.example to .env.local, configure Firebase, then run npm run dev. Run npm test for route and validation checks and npm run build for the production build.

## Firebase

Enable Google sign-in and authorize the production hostname. Set the four NEXT_PUBLIC_FIREBASE variables from the registered web app. Store FIREBASE_SERVICE_ACCOUNT_JSON as a server-only production Secret in Vercel. Never commit a service account key. Use separate credentials and projects for development and previews. Firestore browser access is denied; authenticated Node.js API routes authorize writes with Firebase Admin.

## Data

- users/{uid} stores profile details and timestamps.
- users/{uid}/private/progress stores the notebook and checklist.
- users/{uid}/quizAttempts/{id} stores answers and server-calculated scores.
- quizzes/first-paycheck stores the quiz definition, created on the first submitted attempt or by npm run db:seed.
- forumMessages/{id} and its replies subcollection store public discussions.
- _rateLimits stores per-user write limits.

Guests learn with locally saved progress. Signed-in users have private cloud notebooks. Forum writes require a verified Google account. Text is validated and escaped. Never post private financial information.

## Deployment and caching

Deploy the repository root as Next.js on Vercel at https://money-lab-purdue.vercel.app. Routes include /learn/paycheck, /practice/budget, and /community. Old hash links redirect to the new routes.

Static pages revalidate hourly, Next.js caches versioned assets, and public forum responses use a short CDN cache. Personal responses and writes use private, no-store. User data never enters cached page output.

All financial examples are fictional and educational. No transactions or personalized financial advice.
