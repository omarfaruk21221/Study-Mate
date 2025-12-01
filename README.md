#  StudyMate — Find Your Perfect Study Partner
---

##  About the Project
**StudyMate** is a full-stack MERN web platform designed to help students find their ideal study partners.
The system connects learners based on subjects, study preferences, and experience levels,
creating an interactive and goal-driven study environment.

## Key Features

-  **User Authentication System**
  - Firebase authentication (Email/Password + Google Sign-in)
  - Dynamic Navbar: different views for logged-in and logged-out users

-  **Full CRUD Functionality**
  - Create, Read, Update, and Delete study partner profiles
  - Partner data stored securely in MongoDB via Express API

-  **Find Partner with Search and Sort**
  - Search by subject or location using MongoDB `$regex`
  - Sort by experience level (Beginner → Expert)

- **Send Partner Request**
  - Request to connect with other students
  - Partner count updates automatically in MongoDB using `$inc`

-  **Modern UI + Light/Dark Theme**
  - Built using React, Tailwind CSS, and DaisyUI
  - Responsive layout across all screen sizes
  - Includes theme toggle for user preference

---

##  Technologies Used

**Frontend:** React.js, Tailwind CSS, DaisyUI, React Router, Axios, React Toastify
**Backend:** Node.js, Express.js, MongoDB, dotenv, CORS
**Authentication:** Firebase Authentication
**Hosting:** Netlify (Client), Vercel (Server)

##  CRUD Operation Summary
| Operation | Page | Description |
|------------|------|-------------|
| **Create** | Create Partner Profile | Logged-in users can add their profile |
| **Read** | Find Partners | View all available study partners |
| **Update** | My Connections | Edit or update previously sent partner requests |
| **Delete** | My Connections | Delete unwanted partner requests |


##  Additional Features
- Custom loading spinner for smooth user experience
- Protected routes using PrivateRoute component
- Toast notifications for all user actions
- Creative 404 Not Found page
- Firebase domain whitelisted to prevent reload issues


##  Developer Info

**Developer:** Md. Omar Faruk
**Live Site URL:** https://studymatea10.netlify.app/
**Server Live URL:** https://study-mate-server-sigma.vercel.app/
**GitHub (Client):** https://github.com/omarfarukcodes69/study-mate-client
**GitHub (Server):** https://github.com/omarfarukcodes69/study-mate-server

© 2025 StudyMate | Developed with  by Md. Omar Faruk
