FROM node:16 AS build-stage

ENV REACT_APP_BACKEND_URL="http://localhost:3001/api"

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm ci

RUN SKIP_PREFLIGHT_CHECK=true npm run build

RUN npm install -g serve

CMD ["serve", "build"]
