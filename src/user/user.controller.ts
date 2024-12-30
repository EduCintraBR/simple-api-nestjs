import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UpdatePartialUserDTO } from "./dto/update-partial-user.dto";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { ParamId } from "src/decorators/param-id.decorator";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() userData: CreateUserDTO) {
        return await this.userService.create(userData);
    }

    @Get()
    async getAll() {
        return await this.userService.findAll();
    }

    @Get(':id')
    async getById(@ParamId() id: number) {
        return await this.userService.findOne(id);
    }

    @Put(':id')
    async update(@Body() data: UpdateUserDTO, @ParamId() id: number) {
        return await this.userService.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePartialUserDTO, @ParamId() id: number) {
        return await this.userService.updatePartial(id, data);
    }

    @Delete(':id')
    async remove(@ParamId() id: number) {
        await this.userService.remove(id);
        return `id ${id} removed successfully`;
    }
}