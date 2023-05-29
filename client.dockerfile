FROM node:18-alpine AS build

WORKDIR /app

COPY ./package*.json ./
COPY ./packages/client/package.json ./packages/client/

RUN npm -w client ci

COPY ./tsconfig*.json ./
COPY ./packages/client/src/ ./packages/client/src/
COPY ./packages/client/index.html ./packages/client/
COPY ./packages/client/tsconfig*.json ./packages/client/
COPY ./packages/client/vite.config.ts ./packages/client/

ARG VITE_SERVER_BASE_URL
ENV VITE_SERVER_BASE_URL $VITE_SERVER_BASE_URL

RUN npm -w client run build

FROM nginx:1.25-alpine

COPY --from=build /app/packages/client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
