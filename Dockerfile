# Use an official Node.js runtime as the base image
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application for production
RUN npm run build

# Use a lightweight web server to serve the built files
FROM nginx:alpine

# Copy the built files from the previous stage to the nginx web server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to make the app accessible
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]