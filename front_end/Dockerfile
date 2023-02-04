# Use an official Node.js runtime as the base image
FROM node:16.17.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY front_end/package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY front_end .

# Expose port 3000 for the Node.js development server
EXPOSE 3000

# Run the command to start the Node.js development server
CMD ["npm", "start"]