// This avoids the need to copy and paste dto body from create-coffee.dto.ts
// Reduces code duplication

import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';

//! PartialType is a utility function that is wrapper around TypeScript mapping special types like Partial, Omit etc.
//! Another fine example of an abstraction of an abstraction for the sake of abstraction
export class UpdateCoffeeMappedTypesDto extends PartialType(CreateCoffeeDto) {}
