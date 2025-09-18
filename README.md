# React Recipe Board — CRUD app with React + Vite + Tailwind

## Introduction

This is a simple recipe board demonstrating a typical CRUD workflow in React. It uses Passport Strategy to Authenticate user and API for creating, reading, updating, and deleting the postings. This React app showcases routing, data fetching, UI, forms, using Passport strategy authentication, and connecting to MongoDB to store user profiles and the post data with mongoose to define schemas.

<!-- **Link to project**: https://your-live-demo-url.example.com -->

<!-- ![App Screenshot](public/screen.png) -->

## Tech Stack

- **Frontend**: React, Vite, React Router
- **Styling**: Tailwind CSS
- **UI/UX**: React Icons, React Toastify, React Spinners
- **Tooling**: ESLint
- **Backend**: Express, Passport.js, cloudinary, MongoDB,

## Features

- **Browse Posts**: List all post view and single Post view
- **Authentication**: Sign up and login
- **Create Post**: Add new Posts
- **Update Post**: Update existing postings
- **Delete Post**: Remove postings
- **Routing**: Client-side routing for pages and deep links
- **Feedback**: Loading states and toasts for user actions

## How It's Made

- **Routing**: Implemented with `react-router-dom` using a main layout (`layouts/MainLayout.jsx`) and page components in `pages/`.
- **State & Data**: Posts are fetched from database(MongoDB). Simple `fetch` calls handle CRUD operations; loading states use `react-spinners` and notifications use `react-toastify`.
- **UI**: Tailwind CSS utility classes for rapid styling, reusable UI in `components/`
- **Dev Experience**: Vite for fast HMR, ESLint for consistency, and a clear folder structure for scalability.

## Project Structure

**React App**

```
src/
  assets/
    images/
      logo.png
  components/
    Card.jsx
    Hero.jsx
    HomeCards.jsx
    Navbar.jsx
    PostListing.jsx
    PostListings.jsx
    PostLoader.jsx
    ProtectedRoute.jsx
    Spinner.jsx
    ViewAllPosts.jsx
  contexts/
    AuthContext.jsx
  layouts/
    MainLayout.jsx
  pages/
    AddPostPage.jsx
    EditPostPage.jsx
    HomePage.jsx
    LoginPage.jsx
    NotFoundPage.jsx
    PostPage.jsx
    PostsPage.jsx
    SignUpPage.jsx
  App.css
  App.jsx
  index.css
  main.jsx
```

**Backend Structure**

```
react-Posts/
├── backend/
│   ├── server.js
│   ├── config/
|   |   ├── .env (Add this)
│   │   ├── database.js
│   │   └── passport.js
│   ├── middleware/
│   |   ├── auth.js
│   |   ├── cloudinary.js
|   |   └── multer.js
│   ├── models/
│   │   ├── Post.js
│   │   └── User.js
│   └── routes/
│       ├── auth.js
│       └── posts.js
├── src/ (React app)
└── package.json
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Add `.env` file with

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

---

### 3) Run

- **For running both React App and Server**

```bash
npm run dev:full
```

---

- Serves backend at `http://localhost:2121`.

```bash
npm run server
```

- Run the React app (Vite)
- Vite will print the dev URL. (`http://localhost:3000`)

```bash
npm run dev
```

---

Open the printed URL in your browser.

## Scripts

```bash
# Start Vite dev server
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview

# Start both Frontend and Backend Server
npm run dev:full
```

## Lessons Learned

- Feature-oriented folder structure scales better as the app grows
- Used Tailwind to keep consistent styles
- Small, reusable components simplify UI changes
- Clearly defined loading and error states improve UX during CRUD operations

## Optimizations

- Add search, filters, and pagination to Post listings
- Implement server-side validation and error handling
- Code-split routes and lazy-load non-critical pages

## Examples

- **Portfolio:** https://slyncrafty.github.io/
