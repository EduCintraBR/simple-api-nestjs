import { BadRequestException, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileService } from "./file.service";
import { User } from "src/decorators/user.decorator";
import { UserDto } from "src/user/dto/user.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(
        @User() user: UserDto, 
        @UploadedFile(new ParseFilePipe({
            validators: [
                new FileTypeValidator({fileType: `^image\/(png|jpe?g)$`}),
                new MaxFileSizeValidator({maxSize: 2 * 1024 * 1024}) //2MB
            ]
        })) photo: Express.Multer.File
    ) {
        try {
            const response = await this.fileService.uploadPhoto(user, photo);
            return response;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(AuthGuard)
    @Post('upload-files')
    async uploadFiles(@User() user: UserDto, @UploadedFiles() files: Express.Multer.File[]) {
        try {
            // const response = await this.fileService.uploadPhoto(user, photo);
            return files;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @UseInterceptors(FileFieldsInterceptor([{
        name: 'photo',
        maxCount: 1
    }, {
        name: 'documents',
        maxCount: 10
    }]))
    @UseGuards(AuthGuard)
    @Post('upload-file-fields')
    async uploadFilesFields(@User() user: UserDto, files: { photo: Express.Multer.File, documents: Express.Multer.File[] }) {
        try {
            // const response = await this.fileService.uploadPhoto(user, photo);
            return files;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}