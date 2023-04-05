
FROM node:18-alpine

ENV USERNAME dev

RUN adduser -D $USERNAME


WORKDIR /home/$USERNAME/app


COPY package.json package-lock.json ./
RUN npm install

COPY next.config.js ./next.config.js
COPY pages ./pages
COPY public ./public 
COPY styles ./styles
COPY . .

RUN chown -R $USERNAME /home/$USERNAME
USER $USERNAME

CMD [ "npm","run", "dev" ]

