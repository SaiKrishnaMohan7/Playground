import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
// import { TasksRepository } from './task.repository';

// Importing ConfigModule allows to inject ConfigService in the module
@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule, ConfigModule], // defines which repositories are in current scope
  controllers: [TaskController],
  providers: [TaskService /*TasksRepository*/],
})
export class TaskModule {}
