FROM node:8-alpine

RUN apk add --no-cache python make g++ bind-tools

RUN mkdir -p /app
WORKDIR /app

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

COPY ./package*.json /app/
RUN npm install
COPY ./ /app/

ENTRYPOINT ["npm"]
CMD ["start"]
