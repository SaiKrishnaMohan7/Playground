import { ArrayMinSize, IsArray, IsString } from 'class-validator';

// DTO good for typesafety and validation
// DTO is a class that defines what the shape of data will be sent over the network
export class CreateCoffeeDto {
  @IsString()
  readonly name: string; // Best practice to make dto fields readonly

  @IsString()
  readonly brand: string;

  @IsArray()
  @IsString({ each: true, message: ({ value }) => `${value} is not a string` }) // Some intricate validation is possible here
  @ArrayMinSize(1)
  readonly flavors: string[];
}
