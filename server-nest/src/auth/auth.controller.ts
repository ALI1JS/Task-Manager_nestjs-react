import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';

@Controller('/v1/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async Signup(@Body() newUser: SignupDto) {
    return await this.authService.createUser(newUser);
  }

  @Post('login')
  async Login(@Body() loginData) {
    return await this.authService.userLogin(loginData);
  }
}
