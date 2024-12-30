import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
    ) {}

    async createToken(user: User) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                email: user.email
            }, {
                expiresIn: '3h',
                subject: String(user.id),
                issuer: 'nestjs-auth-login',
                audience: 'users'
            })
        }
    }

    async checkToken(token: string) {
        return this.jwtService.verify(token);
    }

    async register(data: AuthRegisterDTO) {
        const user = await this.userService.create(data);
        return this.createToken(user);
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email,
                password
            }
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.createToken(user);
    }

    async forgetPassword(email: string) {
        const user = await this.prisma.user.findFirst({
            where: { email }
        });

        if (!user) {
            throw new UnauthorizedException('Invalid email');
        }

        // TO DO: Send email with reset password link

        return true;
    }

    async resetPassword(password: string, token: string) {
        // TO DO: Validate token

        // TO DO: Get user id from token
        const id = 1;

        const user = await this.prisma.user.update({
            where: { id },
            data: { password }
        });

        return this.createToken(user);
    }
}