import { redis } from "../../redis";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User"
import bcyrpt from "bcryptjs"
import { forgotPasswordPrefix } from "../constants/redisPrefixes";
import { ChangePasswordInput } from "./changePassword/changePaswordInput";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class ChangePasswordResolver {
    @Mutation(() => User, { nullable: true })
    async changePassword(
        @Arg("data") { token, password }: ChangePasswordInput,
        @Ctx() ctx: MyContext
    ) : Promise<User | null> {

        const userId = await redis.get(forgotPasswordPrefix + token)

        if (!userId) return null

        const user = await User.findOne(userId)

        if (!user) return null

        await redis.del(forgotPasswordPrefix + token)

        user.password = await bcyrpt.hash(password, 12)

        await user.save()

        // log them in once they have changed their password
        ctx.req.session!.userId = user.id

        return user
    }
}