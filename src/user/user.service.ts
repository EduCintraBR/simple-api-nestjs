import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePartialUserDTO } from "./dto/update-partial-user.dto";
import { UserDto } from "./dto/user.dto";
import { MapperService } from "src/mapper/mapper.service";
import { UserModel } from "./models/user.model";

@Injectable()
export class UserService {
    constructor(
        private readonly _prismaService: PrismaService,
        private readonly _mapper: MapperService,
    ) {}

    async create(data: CreateUserDTO) {
        const saltRounds = 10;
        data.password = await bcrypt.hash(data.password, saltRounds);

        return this._prismaService.user.create({ data });
    }

    async findAll(): Promise<UserDto[]> {
        const users: UserModel[] = await this._prismaService.user.findMany();
        return users.map((user) => 
            this._mapper.map<UserModel, UserDto>(user, UserModel, UserDto)
        );          
    }

    async findOne(id: number) {
        const user = await this._prismaService.user.findUnique({ where: { id } });
        if(!user) throw new NotFoundException('User not found');
         
        return this._mapper.map<UserModel, UserDto>(user, UserModel, UserDto);
    }

    async update(id: number, data: CreateUserDTO) {
        await this.verifyIfUserNotExists(id);

        return this._prismaService.user.update({ where: { id }, data });
    }

    async updatePartial(id: number, data: UpdatePartialUserDTO) {
        await this.verifyIfUserNotExists(id);

        return this._prismaService.user.update({ where: { id }, data });
    }

    async remove(id: number) {
        await this.verifyIfUserNotExists(id);

        return this._prismaService.user.delete({ where: { id } });
    }

    async verifyIfUserNotExists(id: number) { 
        if(!await this.findOne(id)) {
            throw new NotFoundException('User not found');
        }
    }
}