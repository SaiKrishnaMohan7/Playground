import { Post, Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credetials.dto';
import { JwtToken } from './jwt-token.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<boolean> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signin(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<JwtToken> {
    return this.authService.signIn(authCredentialsDto);
  }
}
