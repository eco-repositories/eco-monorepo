# Setup
FROM node:22-alpine

WORKDIR /app

# Install git submodules
COPY ./.git/ ./.git/
COPY ./.gitmodules ./

RUN apk add --no-cache git
RUN git submodule update --init --recursive
RUN git submodule foreach "npm ci"

# Install npm dependencies
COPY ./package*.json ./
COPY ./packages/shared/package.json ./packages/shared/

RUN npm -w shared ci

# Build git submodules
RUN git submodule foreach "npm run build -ws --if-present"

# Build npm dependencies
COPY ./tsconfig*.json ./
COPY ./packages/shared/src/ ./packages/shared/src/
COPY ./packages/shared/tsconfig*.json ./packages/shared/

RUN npm -w shared run build
