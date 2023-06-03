import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
