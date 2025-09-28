#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Check Node version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

console.log(`Current Node.js version: ${nodeVersion}`);

// Read package.json to get required version
const packagePath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

if (packageJson.engines && packageJson.engines.node) {
  const requiredVersion = packageJson.engines.node;
  console.log(`Required Node.js version: ${requiredVersion}`);
  
  // Simple check for minimum version
  const minVersion = parseInt(requiredVersion.replace(/[^\d]/g, ''));
  
  if (majorVersion < minVersion) {
    console.error(`❌ Node.js version ${nodeVersion} is not supported.`);
    console.error(`Please use Node.js ${requiredVersion} or higher.`);
    process.exit(1);
  } else {
    console.log(`✅ Node.js version is compatible.`);
  }
} else {
  console.log('⚠️  No Node.js version requirement specified in package.json');
}