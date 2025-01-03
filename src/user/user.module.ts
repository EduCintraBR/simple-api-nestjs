import { forwardRef, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserController } from "./user.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserService } from "./user.service";
import { MapperModule } from "src/mapper/mapper.module";
import { UserIdCheckMiddleware } from "src/middlewares/user-id-check.middleware";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [PrismaModule, MapperModule, forwardRef(() => AuthModule)],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule implements NestModule { 
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware)
            .forRoutes('users/:id');
    }
}