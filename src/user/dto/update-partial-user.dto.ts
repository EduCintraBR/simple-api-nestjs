import { IsEmail, IsOptional, IsString, IsStrongPassword, MinLength } from "class-validator";

export class UpdatePartialUserDTO {
    @IsOptional()
    @IsString()
    @MinLength(3)
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1
    })
    password: string;
}