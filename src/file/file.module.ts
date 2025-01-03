import { forwardRef, Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [forwardRef(() => AuthModule), forwardRef(() => UserModule)],
    controllers: [FileController],
    providers: [FileService]
})
export class FileModule { }
