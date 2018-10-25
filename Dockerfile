FROM node:10-alpine
WORKDIR /usr/src/larry-client
ARG PORT=80
ENV PORT=$PORT

# Install app dependencies
COPY package*.json ./
RUN yarn install --non-interactive --production

# Bundle app source
COPY . .

# Network
EXPOSE ${PORT}

# Run
CMD ["yarn", "start"]
