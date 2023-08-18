FROM base:latest AS build

WORKDIR /app

COPY ./package*.json ./
COPY ./packages/client/package.json ./packages/client/

RUN npm -w client ci

COPY ./tsconfig*.json ./
COPY --from=base /app/packages/shared/ ./packages/shared/
COPY ./packages/client/src/ ./packages/client/src/
COPY ./packages/client/index.html ./packages/client/
COPY ./packages/client/tsconfig*.json ./packages/client/
COPY ./packages/client/vite.config.ts ./packages/client/

ARG VITE_SERVER_BASE_URL
ENV VITE_SERVER_BASE_URL $VITE_SERVER_BASE_URL

RUN npm -w client run build

FROM nginx:1.25-alpine as start

WORKDIR /usr/share/nginx

COPY --from=build /app/packages/client/dist ./html/
COPY ./packages/client/nginx.conf ./nginx.conf.template

ARG CLIENT_PORT_CONTAINER
ENV CLIENT_PORT_CONTAINER $CLIENT_PORT_CONTAINER

RUN cat nginx.conf.template | envsubst '$CLIENT_PORT_CONTAINER' > nginx.conf

EXPOSE ${CLIENT_PORT_CONTAINER}

CMD ["nginx", "-g", "daemon off;"]
