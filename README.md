**An assessment using React**

A list of movies database built using Next.js, TypeScript and PWA.

- View Wiki [https://github.com/fionleo1804/fionleo-movie-app/wiki]
- View Desktop Result: [https://github.com/fionleo1804/fionleo-movie-app/blob/main/output/desktop.mp4]
- View Mobile Result: [https://github.com/fionleo1804/fionleo-movie-app/blob/main/output/mobile.mp4]

🚀 Features

Home Screen
- Displays a grid of movies with posters, titles, and popularity ratings.
- Dropdown menu to sort movies by:
    - Release Date (Default)
    - Alphabetical Order
    - Rating/Popularity
- Infinite Scroll: Automatically loads more movies as the user reaches the bottom of the page.
- Pull to Refresh: Seamlessly refresh the list to get the latest data.

Detail Screen
- View specific details including Synopsis, Genres, Language, and Duration.
- A simulated booking button that opens a web view to google.com.

PWA (Progressive Web App)
- Offline Support: View previously loaded movie data even without an internet connection.
- Custom Fallback: Dedicated offline page when network is unavailable.
- Smart Caching: Assets and TMDB API responses are cached using Workbox strategies.

🛠️ Tech Stack
- Framework: Next.js 16 (App Route)
- Language: TypeScript
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

The project uses a custom PWA configuration, it requires the Webpack engine to generate Service Workers. Do not use Turbopack for production builds.

To build and test the PWA locally:
- Build with Webpack:

    `npx next build --webpack`

- Start Production Server:

    `npm run start`

- To verify:
    Open Chrome DevTools > Application > Service Workers to ensure sw.js is active.