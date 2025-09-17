# Bar Tal - UX/UI Designer Portfolio

A modern, responsive portfolio website showcasing UX/UI design work and professional experience.

## Overview

This portfolio website features a clean, professional design with smooth animations and interactive elements. Built with modern web technologies, it provides an engaging way to showcase design projects, work experience, and professional capabilities.

## Features

- **Responsive Design** - Optimized for all devices and screen sizes
- **Interactive Animations** - Smooth transitions and hover effects using Framer Motion
- **Company Logos Carousel** - Horizontal scrolling showcase of trusted companies
- **Project Gallery** - Filterable portfolio of design work
- **Contact Integration** - Easy ways to get in touch
- **Admin Panel** - Content management capabilities

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Axios for API communication

**Backend:**
- Node.js with Express
- RESTful API endpoints
- Static file serving
- CORS and security middleware

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5001`

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
├── client/          # React frontend application
├── server/          # Express.js backend API
├── package.json     # Root dependencies and scripts
└── README.md        # Project documentation
```

## API Endpoints

- `GET /api/projects` - Retrieve portfolio projects
- `GET /api/companies` - Get company logos data
- `POST /api/projects` - Create new project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

## License

This project is for portfolio demonstration purposes.

---

**Bar Tal** - UX/UI Product Designer  
*Turning complexity into clarity – UX/UI for mission-critical systems*