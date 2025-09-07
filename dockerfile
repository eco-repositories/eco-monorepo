# Setup
FROM node:22-alpine AS base

WORKDIR /app

COPY ./.git/ ./.git/
COPY ./.gitmodules ./
COPY ./package*.json ./
COPY ./packages/shared/package.json ./packages/shared/

RUN apk add --no-cache git
RUN npm run libs:init
RUN npm run libs:pull
RUN npm run libs:install
RUN npm -w shared ci

# Build
COPY ./tsconfig*.json ./
COPY ./packages/shared/src/ ./packages/shared/src/
COPY ./packages/shared/tsconfig*.json ./packages/shared/

RUN npm run libs:build
RUN npm -w shared run build

# Setup
FROM base:latest AS server

WORKDIR /app

COPY ./package*.json ./
COPY ./packages/server/package.json ./packages/server/

RUN npm -w server ci

# Build
COPY ./tsconfig*.json ./
COPY ./packages/server/src/ ./packages/server/src/
COPY \
  ./packages/server/nest-cli.json ./packages/server/tsconfig*.json \
  ./packages/server/

RUN npm -w server run build

# Start
RUN npm -w server ci --omit=dev

SHELL [ "/bin/sh", "-c" ]

CMD npm -w server start

# Setup
FROM base:latest AS client-setup

WORKDIR /app

COPY ./package*.json ./
COPY ./packages/client/package.json ./packages/client/

RUN npm -w client ci

# Build
COPY ./tsconfig*.json ./
COPY ./packages/client/src/ ./packages/client/src/
COPY \
  ./packages/client/index.html ./packages/client/tsconfig*.json ./packages/client/vite.config.ts \
  ./packages/client/

ARG VITE_SERVER_BASE_URL
ENV VITE_SERVER_BASE_URL=$VITE_SERVER_BASE_URL

RUN npm -w client run build

# Start
FROM nginx:1-alpine AS client

WORKDIR /

ARG CLIENT_PORT_CONTAINER
ENV CLIENT_PORT_CONTAINER=$CLIENT_PORT_CONTAINER

COPY --from=client-setup /app/packages/client/dist /usr/share/nginx/html
COPY ./packages/client/nginx.conf.template /etc/nginx/nginx.conf.template

RUN apk add --no-cache gettext
RUN envsubst '$CLIENT_PORT_CONTAINER' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

EXPOSE ${CLIENT_PORT_CONTAINER}

# "daemon off" keeps the container running
CMD ["nginx", "-g", "daemon off;"]
