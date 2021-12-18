FROM mhart/alpine-node:16

RUN apk add gcompat

WORKDIR /app
COPY . .

EXPOSE 9001
CMD ["node", "app.js"]