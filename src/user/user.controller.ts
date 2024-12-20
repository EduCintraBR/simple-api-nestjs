import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UpdatePartialUserDTO } from "./dto/update-partial-user.dto";

@Controller('users')
export class UserController {

    @Post()
    async create(@Body() userData: CreateUserDTO) {
        return {userData};
    }

    @Get()
    async getAll() {
        return {users: []};
    }

    @Get(':id')
    async getById(@Param() id) {
        return {
            user: {},
            param: id
        }
    }

    @Put(':id')
    async update(@Body() data: UpdateUserDTO, @Param() id) {
        return {
            body: data,
            param: id
        }
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePartialUserDTO, @Param() id) {
        return {
            body: data,
            param: id
        }
    }

    @Delete(':id')
    async remove(@Param() id) {
        return `id ${id} removed successfully`;
    }
}