import { IsEmail, IsEnum, IsString, IsStrongPassword } from "class-validator";
import { Role } from "../../enums/role.enum";

export class UserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1
    })
    password: string;

    @IsEnum(Role)
    role: number;
}