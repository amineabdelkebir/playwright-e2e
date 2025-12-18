# Use official Playwright image
FROM mcr.microsoft.com/playwright:v1.42.1-jammy

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy the rest of the project
COPY . .

# Install Playwright browsers (already included, but safe)
RUN npx playwright install --with-deps

# Default command
CMD ["npx", "playwright", "test"]
