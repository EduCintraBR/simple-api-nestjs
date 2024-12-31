import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword, MinLength } from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateUserDTO {
    @IsString()
    @MinLength(3)
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1
    })
    password: string;

    @IsOptional()
    @IsEnum(Role)
    role: number;
}