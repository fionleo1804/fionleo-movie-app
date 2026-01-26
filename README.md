🎬 An assessment using React
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

🧪 Testing Coverage
The project includes a robust test suite that verifies all core business requirements.
Requirement	Test File	Assertion Logic
Movie List Rendering	Home.test.tsx	Verifies titles, ratings, and image paths exist in the DOM.
Sorting Logic	Home.test.tsx	Simulates dropdown change and verifies API call parameters.
Infinite Scroll	Home.test.tsx	Ensures the scroll wrapper is present and interactive.
Movie Details	MovieDetailPage.test.tsx	Validates Synopsis, Genres, Language, and Runtime display.
Booking Simulation	MovieDetailPage.test.tsx	Mocks window.open to verify the redirect to https://www.google.com/search?q=google.com.

📦 Installation & Setup

1. Prerequisites
- Node.js (v20.x or higher)
- npm or yarn

2. Environment Variables
Create a .env.local file in the root directory and add your TMDB API Key:

NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=tmdb_api_url_here
NEXT_PUBLIC_TMDB_IMAGE_BASE=https://image.tmdb.org/t/p/w500

3. Installation
npm install

4. Development Server
npm run dev

5. Running Tests
# Run all tests
npm test

# Run tests with coverage report
npx jest --coverage

📁 Project Structure
├── app/
│   ├── movie/[id]/page.tsx   # Detail Screen
│   ├── page.tsx              # Home Screen
│   └── layout.tsx            # Global Layout & Providers
├── components/               # Reusable UI
├── src/
│   ├── __tests__/            # Unit & Integration Tests
│   └── services/             # TMDB API Service
├── jest.config.js            # Jest Configuration
└── jest.setup.js             # Testing Environment Setup

📝 Implementation Details

API Integration: All requests are routed through a centralized TMDB_API service to ensure consistent error handling and URL construction.

Performance: Images are optimized using the Next.js <Image /> component with custom loaders for TMDB paths.

Type Safety: Interfaces are defined for all API responses to ensure robust data handling across the application.