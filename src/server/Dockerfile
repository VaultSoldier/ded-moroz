FROM node:21.4.0-alpine3.18 AS build

WORKDIR /app
COPY . .
RUN npm i

FROM build AS final
WORKDIR /app
ENTRYPOINT ["node", "server.js"]