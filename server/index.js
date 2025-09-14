const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev')); // Use dev format for less verbose logging
app.use(express.json());

// Serve static files from React build directory (only in production)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// Serve static files from client public directory (for both dev and production)
app.use('/static', express.static(path.join(__dirname, '../client/public/static/')));

// API Routes
app.get('/api/projects', (req, res) => {
    // Import the initial projects data
    const projects = require('./data/projects.json');
    res.json(projects);
});

app.get('/api/companies', (req, res) => {
    try {
        // Import the companies data
        const companies = require('./data/companies.json');
        res.json(companies);
    } catch (error) {
        console.error('Error loading companies data:', error);
        res.status(500).json({ 
            error: 'Failed to load companies data',
            message: 'Unable to retrieve company information at this time'
        });
    }
});

app.post('/api/projects', (req, res) => {
    // Handle project creation (for admin functionality)
    const newProject = req.body;
    // In a real app, you'd save to a database
    res.status(201).json(newProject);
});

app.put('/api/projects/:id', (req, res) => {
    // Handle project updates
    const { id } = req.params;
    const updatedProject = req.body;
    // In a real app, you'd update in a database
    res.json({ ...updatedProject, id });
});

app.delete('/api/projects/:id', (req, res) => {
    // Handle project deletion
    const { id } = req.params;
    // In a real app, you'd delete from a database
    res.status(204).send();
});

// Serve React app for all other routes (only in production)
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
} else {
    // In development, only redirect HTML routes to React dev server
    app.get('*', (req, res) => {
        // Don't redirect API calls or static files
        if (req.path.startsWith('/api/') || req.path.startsWith('/static/')) {
            return res.status(404).send('Not found');
        }
        // Only redirect HTML routes
        res.redirect('http://localhost:3000');
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
