import { Inject, Injectable, Module } from '@nestjs/common';

// This can be used when an external lib needs to be bound to the Nest Container

// String-valued token
@Module({
  providers: [
    { provide: 'COFFEE_BRANDS', useValue: ['buddy brew', 'nescafe'] }, // A constant value being injected
  ],
})
// Injecting string-valued token into CoffeesService
@Injectable()
export class CoffeesService {
  constructor(@Inject('COFFEE_BRANDS') coffeeBrands: string[]) {}
}

/* coffees.constants.ts to prevent typos, can be imported and replace the string COFFEE_BRANDS */
export const COFFEE_BRANDS = 'COFFEE_BRANDS';
