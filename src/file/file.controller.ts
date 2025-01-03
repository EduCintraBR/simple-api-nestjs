import { BadRequestException, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileService } from "./file.service";
import { User } from "src/decorators/user.decorator";
import { UserDto } from "src/user/dto/user.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(@User() user: UserDto, @UploadedFile() photo: Express.Multer.File) {
        try {
            const response = await this.fileService.uploadPhoto(user, photo);
            return response;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}