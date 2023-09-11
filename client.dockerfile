# Setup
FROM base:latest

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
ENV VITE_SERVER_BASE_URL $VITE_SERVER_BASE_URL

RUN npm -w client run build

# Start
RUN npm -w client ci --omit=dev

ARG CLIENT_PORT_CONTAINER
ENV CLIENT_PORT_CONTAINER $CLIENT_PORT_CONTAINER

COPY ./packages/client/serve.json ./packages/client

EXPOSE ${CLIENT_PORT_CONTAINER}

CMD npx serve packages/client/dist \
  --config /app/packages/client/serve.json \
  -p ${CLIENT_PORT_CONTAINER}
