import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CoffeesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/i-luv-coffee'), // Should be in an env file, var etc.k
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
