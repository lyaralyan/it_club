# FROM node:22-alpine

# # Update and install security patches
# # RUN apt update && apt upgrade -y && apt clean
# RUN npm cache clean --force
# RUN npm cache clean --force && npm install --platform=linux --arch=x64 sharp
# RUN apk update && apk upgrade --no-cache
# RUN  npm install -g npm
# WORKDIR /app

# COPY package*.json ./
# RUN yarn install

# COPY . .

# RUN yarn build

# EXPOSE 3000

# CMD ["yarn", "start"]



# FRONTEND DOCKERFILE
# FROM node:22-alpine

# # Install dependencies for sharp and next/image
# RUN apk add --no-cache python3 make g++ \
#   && npm install -g npm

# WORKDIR /app

# # Install deps
# COPY package*.json yarn.lock ./
# RUN yarn install --frozen-lockfile

# # Copy app source code
# COPY . .

# # Build your production Next.js app
# RUN yarn build

# EXPOSE 3000

# CMD ["yarn", "start"]


# ---------- Build stage ----------
FROM node:22-alpine AS builder

# Tools needed only during build
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Install all deps
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source & build
COPY . .
RUN yarn build

# ---------- Production stage ----------
FROM node:22-alpine

WORKDIR /app

# Install only production deps
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy compiled Next.js app from builder
COPY --from=builder /app ./

EXPOSE 3000
CMD ["yarn", "start"]