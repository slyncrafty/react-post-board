# React Recipe Board — CRUD app with React + Vite + Tailwind

This is a simple recipe board demonstrating a typical CRUD workflow in React. It uses JSON Server as a mock API for creating, reading, updating, and deleting the postings.

- **Link to project**: https://your-live-demo-url.example.com

![App Screenshot](public/screen.png)

## Introduction

- **Goal**: Showcase a small React app with routing, data fetching, optimistic UI, and forms.
- **Backend**: `json-server` serves `src/jobs.json` on `http://localhost:8000`.
- **Frontend**: Vite dev server for React. Vite will print the local URL (typically `http://localhost:5173`).

## Tech Stack

- **Frontend**: React, Vite, React Router
- **Styling**: Tailwind CSS
- **UI/UX**: React Icons, React Toastify, React Spinners
- **Tooling**: ESLint
- **Mock API**: JSON Server

## Features

- **Browse jobs**: List view and single job view
- **Create job**: Add new job postings
- **Edit job**: Update existing postings
- **Delete job**: Remove postings
- **Routing**: Client-side routing for pages and deep links
- **Feedback**: Loading states and toasts for user actions

## How It's Made

- **Routing**: Implemented with `react-router-dom` using a main layout (`layouts/MainLayout.jsx`) and page components in `pages/`.
- **State & Data**: Jobs are fetched from JSON Server (`src/jobs.json`). Simple `fetch` calls handle CRUD operations; loading states use `react-spinners` and notifications use `react-toastify`.
- **UI**: Tailwind CSS utility classes for rapid styling, reusable UI in `components/` (e.g., `JobListings.jsx`, `JobListing.jsx`, `Card.jsx`, `Navbar.jsx`).
- **Dev Experience**: Vite for fast HMR, ESLint for consistency, and a clear folder structure for scalability.

## Project Structure

```
src/
  assets/
    images/
      logo.png
  components/
    Card.jsx
    Hero.jsx
    HomeCards.jsx
    JobListing.jsx
    JobListings.jsx
    JobLoader.jsx
    Navbar.jsx
    Spinner.jsx
    ViewAllJobs.jsx
  layouts/
    MainLayout.jsx
  pages/
    AddJobPage.jsx
    EditJobPage.jsx
    HomePage.jsx
    JobPage.jsx
    JobsPage.jsx
    NotFoundPage.jsx
  App.jsx
  App.css
  index.css
  jobs.json
  main.jsx
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run the mock API (JSON Server)

- Serves `src/jobs.json` at `http://localhost:8000`.

```bash
npm run server
```

### 3) Run the React app (Vite)

- Vite will print the dev URL (commonly `http://localhost:5173`).

```bash
npm run dev
```

Open the printed URL in your browser.

## Scripts

```bash
# Start Vite dev server
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview

# Start JSON Server on port 8000
npm run server
```

## Lessons Learned

- Feature-oriented folder structure scales better as the app grows
- Used Tailwind to keep consistent styles
- Small, reusable components simplify UI changes
- Clearly defined loading and error states improve UX during CRUD operations

## Optimizations

- Add authentication
- Replace JSON Server with a real API and caching strategy
- Add search, filters, and pagination to job listings
- Implement server-side validation and error handling
- Code-split routes and lazy-load non-critical pages

## Examples

- **Portfolio:** https://slyncrafty.github.io/
