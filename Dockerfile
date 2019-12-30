FROM node:lts-alpine AS builder
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install --no-optional
COPY . .
RUN npx ng build --prod

FROM nginx:alpine

COPY --from=builder /usr/src/app/dist/front-end /usr/share/nginx/html
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/startup.sh startup.sh

ENTRYPOINT [ "/startup.sh" ]
CMD ["nginx", "-g", "daemon off;"]
