FROM node:24

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends openssl libc6-dev && \
    rm -rf /var/lib/apt/lists/*

COPY package.json ./
RUN rm -f package-lock.json
RUN rm -rf node_modules
RUN npm cache clean --force
RUN npm install

COPY . .

# RUN npm prune --omit=dev

EXPOSE 3000

CMD ["sh", "-c", "npm run start"]
