import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UserLoginDto } from './dto/user-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcryptjs"

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwt: JwtService) { }

  async login(logindto: UserLoginDto) {
    const user = await
      this.userRepo.createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.email = :email', { email: logindto.email })
        .getOne()

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials')
    } else {
      if (await this.verifyPassword(logindto.password, user.password)) {
        const token = this.jwt.signAsync({
          email: user.email,
          id: user.id
        })
        delete user.password
        return { token, user }
      } else {
        throw new UnauthorizedException('Invalid Credentials')
      }
    }
  }

  async verifyPassword(password: string, hashpassword: string) {
    const ismatch = await bcrypt.compare(password, hashpassword)
    if (!ismatch) {
      throw new UnauthorizedException('Invalid Credentials')
    }
    return ismatch
  }

}
