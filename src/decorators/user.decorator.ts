import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((args: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return args ? request.user?.[args] : request.user;
});