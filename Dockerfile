FROM node:22.14-slim AS base

WORKDIR /app

FROM base AS prod-deps
COPY package.json package-lock.json /app/
RUN npm install --omit=dev

FROM base AS build
COPY . /app
RUN npm install
RUN npm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=prod-deps /app/package.json /app/package.json
COPY --from=build /app/dist /app/dist
COPY --from=build /app/.sequelizerc /app/.sequelizerc
COPY --from=build /app/src/database/migrations /app/dist/database/migrations
COPY --from=build /app/src/database/seeds /app/dist/database/seeds
COPY --from=build /app/src/database/config.js /app/dist/database/

EXPOSE 3000

CMD ["sh", "-c", "npm run start"]