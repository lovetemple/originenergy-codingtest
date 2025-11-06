# Use the official Playwright image as base  
FROM mcr.microsoft.com/playwright:v1.45.0-jammy

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Create directories for test outputs
RUN mkdir -p test-results playwright-report

# Set environment variables
ENV ENV=local

# Expose port for viewing reports (optional)
EXPOSE 8080

# Default command - can be overridden
CMD ["npm", "test"]