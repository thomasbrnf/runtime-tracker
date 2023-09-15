import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
   const user = await this.authService.googleLogin(req.user);
   return res.redirect(`http://localhost:5173/callback?access_token=${user.accessToken}&user_id=${user.id}`);
  }

}