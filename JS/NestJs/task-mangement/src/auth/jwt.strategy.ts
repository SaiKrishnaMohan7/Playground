import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { JwtPayload } from './jwt-payload.interface';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      secretOrKey: 'top_secret_69',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user: User = await this.usersRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
