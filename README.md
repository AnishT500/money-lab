# Money Lab

A student financial literacy front end built around a connected learning experiment: understand a paycheck, check the basics, allocate the same $800, and work through an unexpected $80 repair.

## Run

Run `python3 -m http.server 4173` from this directory, then open `http://localhost:4173`.

No install or build step. Deploy the root as a static Vercel project. The existing repository and Vercel project retain their original boiler-finance identifiers; the product is branded Money Lab.

## Design

Warm paper, ink, and one forest-green accent. System sans-serif fonts, monospaced financial labels, original receipt illustrations and a small receipt character. Inline Lucide-style icons use consistent stroke weights and communicate the action alongside a text label. Motion is limited to short transitions and completion feedback, with reduced-motion support.

Three main destinations: Learn, Practice and Community. Learning paths show their steps once, within the learning workspace. Every activity ends with a concrete next step.

## Data and scope

Progress, quiz results, budgets, checklist entries, community posts and replies use browser localStorage. Existing Boiler Finance progress is migrated when the new key is absent. Entries are escaped before rendering. Community discussions and replies are explicitly labeled examples, and locally entered content is not shared with other users.

No accounts, backend, real financial transactions, AI financial scoring, or personalized financial recommendations. All financial numbers are fictional educational examples. Fonts, icons, and illustrations are local; no third-party script or font request is needed.

## Main screens

Home, lesson library, interactive paycheck lesson, five-question quiz and results, practice index, budget workbench, scenario and outcome, savings and credit lessons, internship checklist, community list/search/topic filter, question form, discussion/reply form, and saved notebook.
