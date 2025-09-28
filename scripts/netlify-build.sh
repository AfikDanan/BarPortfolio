#!/bin/bash

# Netlify build script
echo "🚀 Starting Netlify build..."

# Set Node.js version
export NODE_VERSION=18

# Navigate to client directory
cd client

# Install dependencies with legacy peer deps to handle deprecated warnings
echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps --silent --no-audit --no-fund

# Build the project
echo "🔨 Building project..."
npm run build

echo "✅ Build completed successfully!"