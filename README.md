
# OpenAPI Generated JavaScript/Express Server

## Overview
This server was generated using the [OpenAPI Generator](https://openapi-generator.tech) project.
### prerequisites
- NodeJS >= 10.6
- NPM >= 6.10.0
- Mongo >= 3.0

### Mongodb
Mongodb must be installed. Follow the this guide https://docs.mongodb.com/manual/installation/.

1a) after mongodb is installed verify the installation by running
  the appropriate command, depending on the installation

 (example using the ubuntu repo aka mongod)
 ```shell
 mongod -v
 ```
1b)
another option is to change in the config.js the DB_URL to a srv from a service
provider like mongoAtlas, by default it is configured to run locally using the
collection name generated server (//127.0.0.1:27017/generatedServer)


### Node and Npm

Node and npm must be installed. The best practice is through a version manager,
nvm for example https://nodejs.org/en/download/package-manager/#nvm. In general,
node and npm are bundled together.

2) after node & npm is installed, verify installation by:

```shell
node -v
```
should return a message

```shell
v14.17.6
```
3) next is npm,  verify installation by running:


```shell
npm -v
```
should return a message

```shell
7.22.0
```

4a) install dependencies or move to 4b:

```shell
npm install
```

4b) start the server, which runs npm install and then start:

```shell
npm start
```

Finally, you can check the server by using http://localhost:8080/api-docs/
