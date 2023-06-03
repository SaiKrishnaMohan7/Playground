import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { AuthModule } from '../auth/auth.module';
// import { TasksRepository } from './task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule], // defines which repositories are in current scope
  controllers: [TaskController],
  providers: [TaskService /*TasksRepository*/],
})
export class TaskModule {}
