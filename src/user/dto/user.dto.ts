import { IsEmail, IsString, IsStrongPassword } from "class-validator";

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
}