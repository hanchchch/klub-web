FROM node:16

WORKDIR /app/front
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "start"]