FROM node:24-alpine

WORKDIR /app

COPY package*.json .
COPY apps/backend/package*.json apps/backend/
COPY packages/ packages/

RUN npm ci

COPY . .

EXPOSE 3173

CMD ["npm", "run", "dev", "--", "--filter=backend"]
