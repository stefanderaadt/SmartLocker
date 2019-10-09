FROM mhart/alpine-node:11 AS builder
WORKDIR /app
COPY ./src ./src
COPY ./public ./public
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY .babelrc ./.babelrc
COPY webpack.config.js ./webpack.config.js

RUN npm install
RUN npm run build

FROM mhart/alpine-node
WORKDIR /app
COPY --from=builder /app/public .
RUN npm install serve -g
CMD ["serve", "-p", "80", "-s", "."]
