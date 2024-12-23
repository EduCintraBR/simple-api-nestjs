import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserService } from "./user.service";
import { MapperModule } from "src/mapper/mapper.module";

@Module({
    imports: [PrismaModule, MapperModule],
    controllers: [UserController],
    providers: [UserService],
    exports: []
})
export class UserModule { }