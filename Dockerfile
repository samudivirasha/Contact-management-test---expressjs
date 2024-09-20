FROM node:18

# Update vulnerable packages without pinning to specific versions
RUN apt-get update && \
    apt-get install -y git=1:2.39.5-0+deb12u1 libexpat1 libexpat1-dev && \
    apt-get clean

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV production

USER 10014
EXPOSE 3000

CMD ["node", "index.js"]