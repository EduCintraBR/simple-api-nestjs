import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UpdatePartialUserDTO } from "./dto/update-partial-user.dto";
import { UserService } from "./user.service";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Roles(Role.ADMIN)
    @Post()
    async create(@Body() userData: CreateUserDTO) {
        return await this.userService.create(userData);
    }

    @Roles(Role.USER)
    @Get()
    async getAll() {
        return await this.userService.findAll();
    }

    @Roles(Role.ADMIN)
    @Get(':id')
    async getById(@ParamId() id: number) {
        return await this.userService.findOne(id);
    }

    @Roles(Role.ADMIN)
    @Put(':id')
    async update(@Body() data: UpdateUserDTO, @ParamId() id: number) {
        return await this.userService.update(id, data);
    }

    @Roles(Role.ADMIN)
    @Patch(':id')
    async updatePartial(@Body() data: UpdatePartialUserDTO, @ParamId() id: number) {
        return await this.userService.updatePartial(id, data);
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    async remove(@ParamId() id: number) {
        await this.userService.remove(id);
        return `id ${id} removed successfully`;
    }
}