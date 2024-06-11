# Setup
FROM node:22-alpine

WORKDIR /app

COPY ./.git/ ./.git/
COPY ./.gitmodules ./
COPY ./package*.json ./
COPY ./packages/shared/package.json ./packages/shared/

RUN apk add --no-cache git
RUN npm run libs:init
RUN npm run libs:install
RUN npm -w shared ci

# Build
COPY ./tsconfig*.json ./
COPY ./packages/shared/src/ ./packages/shared/src/
COPY ./packages/shared/tsconfig*.json ./packages/shared/

RUN npm run libs:build
RUN npm -w shared run build
