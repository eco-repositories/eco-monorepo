FROM node:18-alpine AS build

WORKDIR /app

COPY ./package*.json ./
COPY ./packages/server/package.json ./packages/server/

RUN npm -w server ci

COPY ./tsconfig*.json ./
COPY ./packages/server/src/ ./packages/server/src/
COPY ./packages/server/nest-cli.json ./packages/server/
COPY ./packages/server/tsconfig*.json ./packages/server/

RUN npm -w server run build

FROM node:18-alpine AS production

WORKDIR /app

COPY ./package*.json ./
COPY ./packages/server/package.json ./packages/server/
COPY --from=build /app/packages/server/dist ./packages/server/dist

RUN npm -w server ci --omit=dev

CMD npm -w server start
