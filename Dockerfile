FROM node:16-alpine AS BUILD
WORKDIR /build
COPY . /build
RUN npm install --production

FROM node:16-alpine
LABEL MAINTAINER="mateo-wallace" DESCRIPTION="An open source bot made using discord.js that contains dice rolling and music playing functionality."
WORKDIR /bot
COPY --from=BUILD /usr/lib/ /usr/lib/
COPY --from=BUILD /lib/ /lib/
COPY --from=BUILD /build/ /bot
ENV NODE_ENV production
CMD ["node", "index.js"]
