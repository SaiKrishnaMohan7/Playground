import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credetials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtToken } from './jwt-token.interface';
// import { UsersRepository } from './user.repository';

@Injectable()
export class AuthService {
  // constructor(private usersRepository: UsersRepository) {}
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<boolean> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('username taken');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return true;
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<JwtToken> {
    const { username, password } = authCredentialsDto;

    const user = await this.usersRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, await user.password))) {
      // better to user crypto and timingSafeEquals to protect against timing attacks
      const jwtPayload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(jwtPayload);

      return { token: accessToken };
    } else {
      throw new UnauthorizedException('nope');
    }
  }
}
