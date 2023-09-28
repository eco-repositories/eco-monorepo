# Setup
FROM base:latest

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

CMD npm -w server start
