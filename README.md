# graphql-server
Typescript GraphQL Server built with TypeGraphQL

### How to setup

1. Clone repo
2. install node modules

```
npm install

```

3. Create ormconfig.json file in root of folder

```
{ 
    "name": "default",
    "type": "postgres",
    "host": "localhost",
    "port": "5432",
    "username": <ENTER DB USERNAME>,
    "password": <ENTER DB PASSWORD,
    "database": <ENTER DB NAME>,
    "synchronize": true,
    "logging": true,
    "entities": [
        "src/entity/*.*"
    ]
}

```

4. In postgres, create a database for the app and match the database name in your ormconfig.json file

5. Make sure you have Redis running on your computer
* Mac: https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298
* Windows: https://redislabs.com/blog/redis-on-windows-10/
* Linux: you know what you're doing


### Running the app

```
npm start
```
