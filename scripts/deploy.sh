#!/bin/bash

# Deployment script for Bar Portfolio
set -e

echo "🚀 Starting deployment process..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
npm run clean

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Build the application
echo "🔨 Building application..."
npm run build

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t bar-portfolio:latest .

echo "✅ Deployment build complete!"
echo "To run: docker run -p 5001:5001 bar-portfolio:latest"