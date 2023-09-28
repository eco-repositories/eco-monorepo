# Setup
FROM node:18-alpine

WORKDIR /app

COPY ./package*.json ./
COPY ./packages/shared/package.json ./packages/shared/

RUN npm -w shared ci

# Build
COPY ./tsconfig*.json ./
COPY ./packages/shared/src/ ./packages/shared/src/
COPY ./packages/shared/tsconfig*.json ./packages/shared/

RUN npm -w shared run build
