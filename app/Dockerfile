
FROM node:18-alpine

ENV USERNAME dev

RUN adduser -D $USERNAME

WORKDIR /home/$USERNAME/app

RUN chown ${USERNAME} .

COPY package.json package-lock.json ./
RUN npm install

COPY next.config.js ./next.config.js
COPY pages ./pages
COPY public ./public 
COPY styles ./styles
COPY . .


USER $USERNAME

CMD [ "npm","run", "dev" ]