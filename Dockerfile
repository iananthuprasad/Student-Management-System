# Use Node 20
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build TypeScript
RUN npm run build

# Expose your app port (change if different)
EXPOSE 5000

# Start the app
CMD ["node", "dist/server.js"]
