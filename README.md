# Bar Portfolio - Node.js Version

A modern portfolio website built with Node.js, Express backend, and React frontend.

## ✅ Project Status: Clean & Optimized

The project has been thoroughly cleaned and optimized for production use.

### 🧹 Cleanup Summary
- ✅ Removed unused components and dependencies
- ✅ Cleaned up debugging logs and console statements
- ✅ Optimized import statements
- ✅ Updated .gitignore for better file management
- ✅ Streamlined project structure

## Project Structure

```
BarPortfolio/
├── server/                 # Express.js backend
│   ├── index.js           # Main server file
│   └── data/              # Server data files
│       └── projects.json  # Projects data
├── client/                # React frontend
│   ├── public/            # Static files
│   ├── src/               # React source code
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── types/         # TypeScript types
│   │   ├── data/          # Data files
│   │   ├── App.tsx        # Main App component
│   │   └── index.tsx      # React entry point
│   ├── package.json       # Client dependencies
│   └── tailwind.config.js # Tailwind configuration
├── package.json           # Server dependencies
└── README.md             # This file
```

## Features

- **Express.js Backend**: RESTful API endpoints for projects
- **React Frontend**: Modern UI with TypeScript and Tailwind CSS
- **Real-time Data**: Projects fetched from API
- **Responsive Design**: Mobile-first approach
- **Admin Panel**: Toggle for admin functionality
- **Smooth Animations**: Framer Motion integration
- **Particle Background**: Interactive background effects

## 🚀 Quick Start

### Development Mode

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Start both server and client:**
   ```bash
   npm run dev
   ```

This will start:
- Express server on `http://localhost:5001`
- React development server on `http://localhost:3000`

### Production Mode

1. **Build the React app:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:5000`

## API Endpoints

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

## Technologies Used

### Backend
- Node.js
- Express.js
- CORS
- Helmet (Security)
- Morgan (Logging)

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React (Icons)
- Axios (HTTP client)

## Development Scripts

- `npm run dev` - Start both server and client in development
- `npm run server` - Start only the Express server
- `npm run client` - Start only the React client
- `npm run build` - Build the React app for production
- `npm start` - Start the production server
- `npm run install-all` - Install dependencies for both server and client

## Environment Variables

Create a `.env` file in the root directory:
```env
PORT=5001
NODE_ENV=development
```

## Deployment

The application is ready for deployment on platforms like:
- Heroku
- Vercel
- Railway
- DigitalOcean App Platform

Make sure to set the `NODE_ENV=production` environment variable in production.

## Migration Notes

This project was converted from Next.js to Node.js. Key changes:
- Removed Next.js specific features (SSR, file-based routing)
- Added Express.js backend with REST API
- Moved React components to separate client directory
- Updated import paths and routing
- Added proxy configuration for development
- Implemented static file serving for production

## 🎉 Success!

The conversion is complete and the application is ready to run! The portfolio maintains all its original functionality while now running on a Node.js backend with a React frontend.
