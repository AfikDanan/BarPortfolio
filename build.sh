#!/bin/bash
set -e
echo "Starting build process..."
cd client
echo "Installing dependencies..."
npm install --legacy-peer-deps --no-audit --no-fund --silent
echo "Building project..."
CI=false npm run build
echo "Build completed successfully!"