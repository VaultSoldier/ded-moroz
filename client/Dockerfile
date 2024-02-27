FROM node:21.4.0-alpine3.18 AS build

WORKDIR /app
COPY . .
RUN chmod +x entrypoint.sh
RUN npm i

FROM build AS final

WORKDIR /app
ENV API_URL="http://localhost:5000"
EXPOSE 5180
CMD [ "./entrypoint.sh" ]