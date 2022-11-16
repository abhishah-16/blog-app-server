import {
  Controller,
  Post,
  Body,
  Res,
  UseInterceptors,
  ClassSerializerInterceptor,
  UsePipes,
  ValidationPipe,
  Get,
  UseGuards,
  Req
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { currentUserGuard } from './current-user.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './entities/user.entity';
import { CurrentUser } from './user.decorator';

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
    res.send({ sucess: true, user })
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async userRegister(@Body() registerdto: CreateUserDto) {
    return this.authService.register(registerdto)
  }

  @Get('status')
  @UseGuards(currentUserGuard)
  authStatus(@CurrentUser() user: User) {
    return { status: !!user, user }
  }

  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('token')
    res.clearCookie('isAuthenticated')
    res.send({ sucess: true })
  }
}
