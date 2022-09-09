FROM node:14

WORKDIR /app

# Bundle APP files
COPY . /app

# Install app dependencies
RUN npm install

RUN npm install -g serve 

RUN npm run build

EXPOSE 3000
CMD ["serve", "-s", "build"]
