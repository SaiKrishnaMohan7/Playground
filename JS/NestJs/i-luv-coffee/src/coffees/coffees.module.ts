import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

// Modules are way to organize code in a Nest application by business domain
@Module({
  imports: [], // Other modules this module imports also importing the providers those modules export
  controllers: [CoffeesController], // Routes this module exposes
  providers: [CoffeesService], // Any providers that need to be instantiated by the Nest Injector; available only in the scope of this module
  exports: [], // Providers that will be available wherever this module is imported
})
export class CoffeesModule {}
