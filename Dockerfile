# Use Node.js LTS base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the application
COPY . .

# Expose app port
EXPOSE 5000

# Default command (you can override it from docker-compose)
CMD ["npm", "run", "dev"]
