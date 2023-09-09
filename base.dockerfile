FROM node:18-alpine as setup

WORKDIR /app

COPY ./package*.json ./
COPY ./packages/shared/package.json ./packages/shared/

RUN npm -w shared ci

FROM setup as build

WORKDIR /app

COPY ./tsconfig*.json ./
COPY ./packages/shared/src/ ./packages/shared/src/
COPY ./packages/shared/tsconfig*.json ./packages/shared/

RUN npm -w shared run build
