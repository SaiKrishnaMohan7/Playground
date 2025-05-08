import { Module } from '@nestjs/common';
import { CoffeeRatingServiceService } from './coffee-rating-service.service';
import { CoffeesModule } from '../coffees/coffees.module';

@Module({
  imports: [CoffeesModule], // Importing the CoffeesModule to use the CoffeesService (exported from CoffeesModule); Imports array is for importing modules
  providers: [CoffeeRatingServiceService],
})
export class CoffeeRatingModule {}

/**
 * Custom Provider, Value Based
 * Use Case:
 *  - Testing with Mocks
 *  - Injecting constant value
 *  - Binding external libraries
 *
 * export class MockCoffeesService { }

@Module({
  providers: [
    {
      provide: CoffeesService,
      useValue: new MockCoffeesService(), // <-- mock implementation
    }
  ]
})
export class CoffeesModule {}

- Whenever CoffeesService token is resolved, it will point to the MockCoffeesService instance
 */
