# 1. Specify the base image
FROM node:18-alpine

# 2. Set the working directory
WORKDIR /app

# 3. Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# 4. Install dependencies
RUN npm install --frozen-lockfile

# 5. Copy the rest of the project files to the working directory
COPY . .

# 6. Build the Next.js application
RUN npm run build

# 7. Expose the port where Next.js will run (default is 3000)
EXPOSE 3000

# 8. Start the application
CMD ["npx", "serve@latest", "out", "-l", "3000"]
