FROM node
ADD . /usr/src
WORKDIR /usr/src
RUN npm install \
  & mkdir file
EXPOSE 3000
VOLUME /usr/src/file
CMD ["node", "server.js"]
