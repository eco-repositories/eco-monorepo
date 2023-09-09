FROM base:latest AS setup

WORKDIR /app

COPY ./package*.json ./
COPY ./packages/server/package.json ./packages/server/

RUN npm -w server ci

FROM setup AS build

WORKDIR /app

COPY ./tsconfig*.json ./
COPY ./packages/server/src/ ./packages/server/src/
COPY \
  ./packages/server/nest-cli.json ./packages/server/tsconfig*.json \
  ./packages/server/

RUN npm -w server run build

FROM build AS start

WORKDIR /app

RUN npm -w server ci --omit=dev

CMD npm -w server start
