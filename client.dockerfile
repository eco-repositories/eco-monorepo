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

FROM build as start

WORKDIR /app

COPY --from=build ./package*.json ./
COPY --from=build /app/packages/shared/ ./packages/shared/
COPY --from=build /app/packages/client/ ./packages/client/

RUN npm -w client ci --omit=dev

ARG CLIENT_PORT_CONTAINER
ENV CLIENT_PORT_CONTAINER $CLIENT_PORT_CONTAINER

COPY ./packages/client/serve.json ./packages/client

EXPOSE ${CLIENT_PORT_CONTAINER}

CMD npx serve packages/client/dist \
  --config /app/packages/client/serve.json \
  -p ${CLIENT_PORT_CONTAINER}
