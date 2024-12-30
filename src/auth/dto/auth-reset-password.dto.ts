import { IsJWT, IsStrongPassword } from "class-validator";

export class AuthResetPasswordDTO {
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1
    })
    password: string;

    @IsJWT()
    token: string;
}