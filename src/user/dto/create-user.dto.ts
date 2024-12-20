import { IsEmail, IsString, IsStrongPassword, MinLength } from "class-validator";

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
}