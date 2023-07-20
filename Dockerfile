# Build
FROM node:18 AS builder
WORKDIR /usr/app

ENV DOCKERIZE_VERSION v0.7.0

RUN apt-get update \
  && apt-get install -y wget openssl \
  && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
  && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

COPY package.json ./
COPY prisma ./prisma/

RUN npm install

RUN rm -rf ./build

COPY . .

# Production
FROM node:18-slim

WORKDIR /usr/app

ENV DOCKERIZE_VERSION v0.7.0

RUN apt-get update \
  && apt-get install -y wget openssl \
  && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
  && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/package*.json ./
COPY --from=builder /usr/app/prisma ./prisma

EXPOSE 3333
