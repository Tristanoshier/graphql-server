import { Query, Resolver } from "type-graphql";

@Resolver()
export class RegisterResolver {
    @Query(() => String, { name: "HelloWorld"})
    async hello() {
        return "hello world"
    }
}