FROM node:22-alpine AS base

WORKDIR /app

COPY \
  ./.git/ \
  ./.git/
COPY \
  ./.gitmodules ./package*.json ./tsconfig*.json \
  ./
COPY \
  ./packages/shared/package.json ./packages/shared/tsconfig*.json \
  ./packages/shared/
COPY \
  ./packages/shared/src/ \
  ./packages/shared/src/

# Use this line to temporarily test local changes in libs
# COPY ./libs/@eco/utils/packages/utils/package.json ./libs/@eco/utils/packages/utils/

RUN apk add --no-cache git
RUN npm run libs:init
RUN npm run libs:pull
RUN npm run libs:install
RUN npm -w shared ci

FROM base AS greeter

WORKDIR /app

COPY \
  ./packages/greeter/package.json ./packages/greeter/tsconfig*.json ./packages/greeter/nest-cli.json \
  ./packages/greeter/
COPY \
  ./packages/greeter/src/ \
  ./packages/greeter/src/

RUN npm -w greeter ci
RUN npm -w greeter run build
RUN npm -w greeter ci --omit=dev

SHELL [ "/bin/sh", "-c" ]

CMD npm -w greeter start

FROM base AS server

WORKDIR /app

COPY --from=greeter \
  /app/packages/greeter/ \
  ./packages/greeter/
COPY \
  ./packages/server/package.json ./packages/server/tsconfig*.json ./packages/server/nest-cli.json \
  ./packages/server/
COPY \
  ./packages/server/src/ \
  ./packages/server/src/

RUN npm -w server ci
RUN npm -w server run build
RUN npm -w server ci --omit=dev

SHELL [ "/bin/sh", "-c" ]

CMD npm -w server start

FROM base AS client-setup

WORKDIR /app

COPY \
  ./packages/client/package.json ./packages/client/index.html ./packages/client/tsconfig*.json ./packages/client/vite.config.ts \
  ./packages/client/
COPY \
  ./packages/client/src/ \
  ./packages/client/src/

ARG VITE_SERVER_BASE_URL
ENV VITE_SERVER_BASE_URL=$VITE_SERVER_BASE_URL

RUN npm -w client ci
RUN npm -w client run build

FROM nginx:1-alpine AS client

WORKDIR /

ARG CLIENT_PORT_CONTAINER
ENV CLIENT_PORT_CONTAINER=$CLIENT_PORT_CONTAINER

COPY --from=client-setup /app/packages/client/dist/ /usr/share/nginx/html/
COPY ./packages/client/nginx.conf.template /etc/nginx/

RUN apk add --no-cache gettext
RUN envsubst '$CLIENT_PORT_CONTAINER' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

EXPOSE ${CLIENT_PORT_CONTAINER}

# "daemon off" keeps the container running
CMD ["nginx", "-g", "daemon off;"]
