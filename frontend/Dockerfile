FROM node:16-alpine
COPY ./config /config
COPY ./public /public
COPY ./src /src
COPY ./webpack.config.ts /webpack.config.ts
COPY ./tsconfig.json /tsconfig.json
COPY ./package.json /package.json
COPY ./entrypoint.sh /entrypoint.sh

ENTRYPOINT [ "sh", "entrypoint.sh" ]