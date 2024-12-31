import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
    ) {}

    private ISSUER = 'nestjs-auth-login';
    private AUDIENCE = 'users';

    createToken(user: User) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                email: user.email
            }, {
                expiresIn: '3h',
                subject: String(user.id),
                issuer: this.ISSUER,
                audience: this.AUDIENCE
            })
        }
    }

    checkToken(token: string) {
        try {
            return this.jwtService.verify(token, {
                issuer: this.ISSUER,
                audience: this.AUDIENCE
            });
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    isValidToken(token: string) {
        try {
            this.checkToken(token);
            return true;
        } catch (error) {
            return false;  
        }
    }

    async register(data: AuthRegisterDTO) {
        const user = await this.userService.create(data);
        return this.createToken(user);
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        };

        if (!await bcrypt.compare(password, user.password)) {
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