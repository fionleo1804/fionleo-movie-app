**Movie PWA**

A high-performance movie database built with Next.js 16, TypeScript, and PWA capabilities. This app provides a seamless, app-like experience with offline support and real-time push notifications.

🚀 Features
- Dynamic Experience: Infinite scroll, pull-to-refresh, and advanced sorting.
- Full PWA Support: Installable on mobile/desktop with offline data persistence via Workbox.
- Push Notifications: Integrated Web Push API for real-time movie alerts.
- Responsive Design: Optimized for both Desktop and Mobile views.

🛠️ Tech Stack
- Framework: Next.js 16 (App Route)
- Language: TypeScript / Javascript
- Styling: Tailwind CSS
- PWA Engine: @ducanh2912/next-pwa (Workbox)
- State & Logic: React Hooks (useState, useEffect, useMemo)
- Testing: Jest & React Testing Library
- Library: react-infinite-scroll-component


📦 Installation & Setup
1. Prerequisites
    - Node.js (v20.x or higher)
    - npm

2. Environment Variables

Create a .env.local file in the root directory. Refer to .env.example

3. Installation

npm install

4. Development Server

npm run dev

5. Running Tests
- Run all tests

    `npm test`

- Watch mode

    `npm run test:watch`


🟢▶️ Production Build (Important)

PWA features require the Webpack engine. **Do not use Turbopack for production**.

To build and test the PWA locally:
- Build with Webpack:

    `npx next build --webpack`

- Start Production Server:

    `npm run start`

- To verify:
    Open Chrome DevTools > Application > Service Workers to ensure sw.js is active.


**Wiki**
For detailed logic, API documentation, and architecture, please visit the Wiki.