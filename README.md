**An assessment using React**
A list of movies database built using Next.js and TypeScript.

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

🛠️ Tech Stack
- Framework: Next.js
- Language: TypeScript
- Styling: Tailwind CSS 4
- State & Logic: React Hooks (useState, useEffect, useMemo)
- Testing: Jest & React Testing Library
- Components: react-infinite-scroll-component


📦 Installation & Setup
1. Prerequisites
    - Node.js (v20.x or higher)
    - npm or yarn

2. Environment Variables
Create a .env.local file in the root directory. Refer to .env.example

3. Installation
npm install

4. Development Server
npm run dev

5. Running Tests
npm test
