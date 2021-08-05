import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import Express from "express"
import { buildSchema } from "type-graphql"
import { createConnection } from "typeorm"
import { RegisterResolver } from "./modules/user/Register"
import session from "express-session"
import { redis } from "./redis"
import connectRedis from "connect-redis"
import cors from "cors"
import { LoginResolver } from "./modules/user/Login"
import { MeResolver } from "./modules/user/Me"
require('dotenv').config();

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, MeResolver]
  })

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req })
  })

  const app = Express()

  const RedisStore = connectRedis(session)

  app.use(
    cors({
      credentials: true,
      origin: true
    })
  )

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: process.env.COOKIE_SECRET as string,
      resave: false,
      saveUninitialized: false,
      
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    })
  );

  await apolloServer.start();

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log("server started on http://localhost4000/graphql")
  })
}

main()