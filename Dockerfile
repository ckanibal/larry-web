FROM node:10-alpine
WORKDIR /usr/src/larry-client
ARG PORT=80
ENV PORT=$PORT

# Install app dependencies
COPY package.json /usr/src/larry-client/package.json
RUN yarn install --non-interactive --production

# Bundle app source
COPY . /usr/src/larry-client

# Network
EXPOSE ${PORT}

# Run
CMD ["yarn", "start"]
