# build environment
FROM node:10-alpine as builder
RUN mkdir -p /usr/src/larry-client
WORKDIR /usr/src/larry-client

# Install app dependencies
COPY package.json /usr/src/larry-client/package.json
RUN yarn install --non-interactive --production

# Bundle app source
COPY . /usr/src/larry-client

# Build
RUN yarn build


# production environment
FROM nginx:alpine
RUN rm -rf /etc/nginx/conf.d
COPY nginx-default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/larry-client/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

