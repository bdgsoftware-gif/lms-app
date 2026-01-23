🎓 LMS Frontend (Student & Guest Experience)

A modern, responsive Learning Management System (LMS) frontend built with React + TypeScript + Vite, designed for students and guest users.
This frontend consumes a REST API (Laravel backend) and focuses on excellent UX, performance, and scalability.

🚀 Tech Stack

React 18 (with Hooks)

TypeScript

Vite

Tailwind CSS

React Router DOM

Axios

GSAP (animations)

Framer Motion (micro-interactions)

React Icons

✨ Key Features
🌐 Public / Guest Features

Home page with animated hero section

Course listing & filtering

Course details page

Coupon preview & pricing display

Responsive UI (mobile, tablet, desktop)

👨‍🎓 Student Features

Authentication (Login / Register)

Student dashboard

Enrolled courses list

Course video player (YouTube-based)

Module & lesson navigation

Resume last watched lesson

Lesson progress tracking

Certificate access (when completed)

Secure route protection

💳 Enrollment & Payment

Free course enrollment

Coupon application (percentage / fixed / 100%)

bKash payment redirection

Enrollment success handling

Mobile bottom enroll CTA

🧱 Project Structure
src/
├── api/                 # Axios API services
├── auth/                # Auth context & guards
├── components/          # Reusable UI components
├── data/                # Static mock data
├── pages/
│   ├── public/          # Home, Courses, Course Details
│   ├── auth/            # Login, Register
│   └── student/         # Dashboard, Course Player
├── student/             # Student-specific components
├── assets/              # Images, icons
├── router.tsx           # App routing
├── main.tsx             # App entry
└── index.css            # Tailwind base styles

🔐 Authentication Flow

Uses Laravel Sanctum (token-based auth)

Auth state managed via AuthContext

Protected routes handled with ProtectedRoute

Auto-redirect after login

📡 API Integration

All API requests are handled via Axios.

Example:

import api from "./axios";

export const fetchCourses = async () => {
  const res = await api.get("/courses");
  return res.data;
};


Base API URL is configurable via environment variables.

⚙️ Environment Variables

Create a .env file in the root:

VITE_API_BASE_URL=http://localhost:8000/api

▶️ Getting Started
1️⃣ Install Dependencies
npm install

2️⃣ Run Development Server
npm run dev


App will run on:

http://localhost:5173

📱 Responsive Design

Mobile-first approach

Sidebar drawer for course player

Sticky enroll CTA for mobile users

Optimized layouts for tablets & desktops

🎬 Animations

GSAP for hero & section animations

Framer Motion for UI transitions

Optimized for performance

No layout shifts

🧪 Development Notes

React 18 compatible

GSAP used with useLayoutEffect to avoid StrictMode issues

Clean separation of UI & logic

Production-ready patterns followed

🔮 Planned Enhancements

Dark mode

Offline video progress sync

Course reviews & ratings

Downloadable certificates

Student notifications

🤝 Backend Dependency

This frontend expects a Laravel 12 REST API backend with:

Sanctum authentication

Enrollment & payment APIs

Course & lesson endpoints

Backend is maintained in a separate repository

📄 License

This project is for educational & internal use.
You may adapt it for your own LMS or learning platform.

👤 Author

Rakibul Hasan Joy
Software Engineer
📍 Dhaka, Bangladesh
🔗 GitHub: @rhjoyofficial
