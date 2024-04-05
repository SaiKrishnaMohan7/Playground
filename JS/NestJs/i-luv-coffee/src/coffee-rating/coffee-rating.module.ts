import { Module } from '@nestjs/common';
import { CoffeeRatingServiceService } from './coffee-rating-service.service';
import { CoffeesModule } from '../coffees/coffees.module';

@Module({
  imports: [CoffeesModule], // Importing the CoffeesModule to use the CoffeesService (exported from CoffeesModule); Imports array is for importing modules
  providers: [CoffeeRatingServiceService],
})
export class CoffeeRatingModule {}
