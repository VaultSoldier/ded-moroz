FROM node:21.4.0-alpine3.18 AS build

WORKDIR /app
COPY . .
RUN chmod +x script.sh
RUN npm i

FROM build AS final

WORKDIR /app
EXPOSE 5180
ENTRYPOINT [ "script.sh" ]