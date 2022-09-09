FROM keymetrics/pm2:10-slim

WORKDIR /app

# Bundle APP files
COPY . /app

# Install app dependencies
RUN npm install
RUN npm install pm2 -g

# Show current folder structure in logs
RUN ls -al -R
EXPOSE 8080
CMD ["pm2-runtime", "pm2.json"]
