FROM node:21.4.0-alpine3.18 AS build

WORKDIR /app
COPY . .
ENV API_URL="http://localhost:5000"
RUN sed -i "s#http://localhost:5000#$API_URL#g" script.js
RUN npm i

FROM build AS final

WORKDIR /app
EXPOSE 5180
CMD [ "npm", "run", "dev" ]