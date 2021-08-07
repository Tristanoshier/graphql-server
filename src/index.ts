import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import Express from "express"
import { createConnection } from "typeorm"
import session from "express-session"
import { redis } from "./redis"
import connectRedis from "connect-redis"
import cors from "cors"
import { createSchema } from "./utils/createSchema"

require('dotenv').config();

const main = async () => {
  await createConnection();

  const schema = await createSchema()

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res })
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