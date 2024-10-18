#!/bin/bash

# Remove Next.js cache and build folders
rm -rf .next
rm -rf out

# Remove node_modules and reinstall
rm -rf node_modules
npm install

# Rebuild the project
npm run build

npm run dev