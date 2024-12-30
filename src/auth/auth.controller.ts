import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetPasswordDTO } from "./dto/auth-forget-password.dto";
import { AuthResetPasswordDTO } from "./dto/auth-reset-password.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: AuthLoginDTO) {
        return await this.authService.login(body.email, body.password);
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {
        return await this.authService.register(body);
    }

    @Post('forget-password')
    async forgetPassword(@Body() body: AuthForgetPasswordDTO) {
        return await this.authService.forgetPassword(body.email);
    }

    @Post('reset-password')
    async resetPassword(@Body() body: AuthResetPasswordDTO) {
        return await this.authService.resetPassword(body.password, body.token);
    }

}