import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../task/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // user should have a status ACTIVE, INACTIVE, REMOVED
  // user should have a role Admin, Viewer

  // eager: true means when we fetch user from the db, ORM will also fetch the tasks for us
  // No separate call to db required
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Array<Task>;
}
