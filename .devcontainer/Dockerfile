# Use the official Node.js image as a parent image
FROM mcr.microsoft.com/devcontainers/javascript-node:0-18

# Install MySQL client
RUN apt-get update && apt-get install -y default-mysql-client  && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /workspace

# Copy the current directory contents into the container at /workspace
COPY . /workspace

# Install any needed packages specified in package.json
# RUN npm install

# Create a .my.cnf file to set the default MySQL host
RUN echo "[client]\nhost=db" > /home/node/.my.cnf && chown node:node /home/node/.my.cnf

# Make port 3000 available to the world outside this container
EXPOSE 3000