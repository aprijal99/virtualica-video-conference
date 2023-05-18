FROM node:16.14.2-alpine as base
RUN apk add --no-cache libc6-compat
WORKDIR base
COPY package.json package-lock.json ./
RUN npm ci

FROM node:16.14.2-alpine as build
WORKDIR build
COPY --from=base base/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:16.14.2-alpine
WORKDIR app
COPY --from=build build/public ./public
COPY --from=build build/.next/standalone ./
COPY --from=build build/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
