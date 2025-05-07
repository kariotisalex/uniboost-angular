FROM node:22-slim AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install tailwindcss @tailwindcss/postcss postcss --force
COPY . .
RUN npm run build -- --configuration production

FROM nginx:stable-alpine
COPY --from=builder /app/dist/uniboost-angular/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
