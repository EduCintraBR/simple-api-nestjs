import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { MailerService } from "@nestjs-modules/mailer";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
        forwardRef(() => UserModule),
        PrismaModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}