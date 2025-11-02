FROM node:20-alpine AS base
WORKDIR /usr/src/app

# Install dependency
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Generate prisma client
FROM base AS builder
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npx prisma generate

FROM base AS runner
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/prisma ./prisma
COPY . .

COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]

CMD [ "node", "server.js" ]