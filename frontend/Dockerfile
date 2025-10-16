# Stage 1: Build React app
FROM node:18-alpine as build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all frontend code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the build output to Nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
