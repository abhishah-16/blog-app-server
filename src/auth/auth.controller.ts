import {
  Controller,
  Post,
  Body,
  Res,
  UseInterceptors,
  ClassSerializerInterceptor,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async userLogin(@Body() logindto: UserLoginDto, @Res() res: Response) {
    const { token, user } = await this.authService.login(logindto)
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000
    })
    res.cookie('isAuthenticated', true, { maxAge: 2 * 60 * 60 * 1000 })
    // return res.send({ success: true, user })
    // const mesg = await this.authService.login(logindto)
    res.send({ sucess: true, user })
    // return mesg
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async userRegister(@Body() registerdto: CreateUserDto) {
    return this.authService.register(registerdto)
  }
}
