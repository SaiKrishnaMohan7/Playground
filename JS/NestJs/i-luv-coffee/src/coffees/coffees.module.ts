import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from './entities/event.entity';
import { ConfigModule } from '@nestjs/config';

// Modules are way to organize code in a Nest application by business domain
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule], // Other modules this module imports also importing the providers those modules export
  controllers: [CoffeesController], // Routes this module exposes
  providers: [CoffeesService], // Any providers that need to be instantiated by the Nest Injector; available only in the scope of this module
  exports: [CoffeesService], // Providers that will be available wherever this module is imported; Can be thought of as the module's public API
})
export class CoffeesModule {}
