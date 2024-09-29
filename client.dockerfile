# Setup
FROM base:latest AS setup

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
FROM nginx:1.27.1-alpine

WORKDIR /

ARG CLIENT_PORT_CONTAINER
ENV CLIENT_PORT_CONTAINER=$CLIENT_PORT_CONTAINER

COPY --from=setup /app/packages/client/dist /usr/share/nginx/html
COPY ./packages/client/nginx.conf.template /etc/nginx/nginx.conf.template

RUN apk add --no-cache gettext
RUN envsubst '$CLIENT_PORT_CONTAINER' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

EXPOSE ${CLIENT_PORT_CONTAINER}

# "daemon off" keeps the container running
CMD ["nginx", "-g", "daemon off;"]
