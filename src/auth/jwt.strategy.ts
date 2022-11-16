import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Request } from "express";
import { UnauthorizedException } from "@nestjs/common";
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => {
                return req?.cookies?.token
            }]),
            ignoreExpiration: false,
            secretOrKey: 'hsuifhH9S34UWIGFNsdgge345',
        })
    }

    async validate(payload: any, req: Request) {
        if (!payload) {
            throw new UnauthorizedException('Invalid Credentials')
        }
        const user = await this.userRepo.findOneBy({ email: payload.email })
        if (!user) {
            throw new UnauthorizedException('Invalid Credentials')
        }
        req.user = user
        return req.user
    }

}