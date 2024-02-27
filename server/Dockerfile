FROM node:21.4.0-alpine3.18 AS build

WORKDIR /app
COPY . .
RUN npm i

FROM build AS final
WORKDIR /app
EXPOSE 5000
CMD ["node", "server.js"]