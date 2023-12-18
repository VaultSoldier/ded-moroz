FROM node:21.4.0-alpine3.18 AS build

WORKDIR /app
COPY src .

FROM build as final
WORKDIR /app/src/client
CMD [ "npm", "run", "dev" ]
WORKDIR /app/src/server
ENTRYPOINT ["node", "server.js"]