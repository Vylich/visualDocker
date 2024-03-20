FROM node:20

WORKDIR /app

COPY . .

ARG VITE_API_URL

ENV VITE_API_URL $VITE_API_URL

RUN npm install

CMD [ "npm", "start"]
