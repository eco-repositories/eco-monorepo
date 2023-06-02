FROM base:latest AS build

WORKDIR /app

COPY ./package*.json ./
COPY ./packages/server/package.json ./packages/server/

RUN npm -w server ci

COPY ./tsconfig*.json ./
COPY --from=base /app/packages/shared/dist/ ./packages/shared/dist/
COPY --from=base /app/packages/shared/package.json ./packages/shared/
COPY --from=base /app/packages/shared/tsconfig*.json ./packages/shared/
COPY ./packages/server/src/ ./packages/server/src/
COPY ./packages/server/nest-cli.json ./packages/server/
COPY ./packages/server/tsconfig*.json ./packages/server/

RUN npm -w server run build

FROM build AS production

WORKDIR /app

COPY ./package*.json ./
COPY --from=build /app/packages/shared/dist/ ./packages/shared/dist/
COPY --from=build /app/packages/shared/package.json ./packages/shared/
COPY --from=build /app/packages/server/package.json ./packages/server/
COPY --from=build /app/packages/server/dist ./packages/server/dist/

RUN npm -w server ci --omit=dev

CMD npm -w server start
