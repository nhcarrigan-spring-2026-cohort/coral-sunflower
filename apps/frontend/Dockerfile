FROM node:24-alpine

WORKDIR /app

COPY package*.json .
COPY apps/frontend/package*.json apps/frontend/
COPY packages/ packages/

RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--filter=frontend", "--", "--host"]
