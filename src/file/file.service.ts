import { Injectable } from "@nestjs/common";
import { writeFile } from "fs/promises";
import { join } from "path";
import { UserDto } from "src/user/dto/user.dto";

@Injectable()
export class FileService {
    async uploadPhoto(user: UserDto, photo: Express.Multer.File) {
        const path = join(__dirname, '..', '..', 'storage', this.mountFileName(user));
        await writeFile(path, photo.buffer);
        return { message: 'Photo uploaded' };
    }

    private mountFileName(user) {
        return `photo-${user.name.toLowerCase()}-${Date.now()}.png`;
    }
}