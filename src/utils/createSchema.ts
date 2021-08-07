import { buildSchema } from "type-graphql"
export const createSchema = () => {
    let schema = buildSchema({
        resolvers: [__dirname + "/../modules/*/*.ts"],
        authChecker: ({ context: { req } }) => {
         return !!req.session.userId
        }
    })
    return schema
}