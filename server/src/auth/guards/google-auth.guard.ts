import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GoogleAuthGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private httpService: HttpService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'].split(' ')[1];
    return this.httpService.axiosRef
      .get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
      )
      .catch((error) => {
        throw new UnauthorizedException(error);
      })
      .then(async (user) => {
        if (!user) throw new UnauthorizedException('Invalid token');
        const validUser = await this.userService.findByEmail(user.data.email);
        if (!validUser) {
          throw new UnauthorizedException();
        }
        return true;
      });
  }
}
