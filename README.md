# Boiler Finance

A responsive financial literacy front end based on the Boiler Finance Figma mockup. Built with semantic HTML, CSS design tokens, and vanilla JavaScript. No dependencies or build step.

## Run locally

From this folder, run `python3 -m http.server 4173` and open http://localhost:4173.

## Features

- Landing page and student dashboard
- Paycheck lesson and five-question quiz with feedback and result tracking
- Editable $800 budget with allocations, validation, reset, and saving action
- Three payday choices and corresponding outcomes
- Internship checklist
- Searchable sample community, question preview, local posts and replies
- Responsive navigation and keyboard-accessible controls

## Data and scope

This is a front-end implementation. Progress, budget, checklist, posts, and replies use browser localStorage. Community sample content is illustrative, and entries are not shared between users. No authentication, server, financial account integration, or shared community backend is configured. Google Fonts supplies Instrument Sans and Instrument Serif.

The Figma connector returned complete design context for the landing page, dashboard, paycheck lesson, quiz results, budget lab, internship guide, community list, thread, and question form before its plan limit was reached. Lesson discovery, quiz interactions, scenario decisions, and responsive behavior were completed in the same design system; their exact Figma screens could not be fully verified. Figma's exported slider decoration could not be downloaded in the restricted local network, so budget sliders use functioning native range controls.

## Deploy

Import the folder in Vercel as an Other/static project. No install or build command is required. The root serves index.html, app.js, and styles.css. Hash-based navigation makes all screens work without server routing.
