import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
// import { TasksRepository } from './task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // defines which repositories are in current scope
  controllers: [TaskController],
  providers: [TaskService /*TasksRepository*/],
})
export class TaskModule {}
