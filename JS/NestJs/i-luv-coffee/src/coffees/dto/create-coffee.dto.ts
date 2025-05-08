import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsString } from 'class-validator';

// DTO good for typesafety and validation
// DTO is a class that defines what the shape of data will be sent over the network
export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a coffee' })
  @IsString()
  readonly name: string; // Best practice to make dto fields readonly

  @ApiProperty({ description: 'The brand of a coffee' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: ['chocolate', 'vanilla'] })
  @IsArray()
  @IsString({ each: true, message: ({ value }) => `${value} is not a string` }) // Some intricate validation is possible here
  @ArrayMinSize(1)
  readonly flavors: string[]; // This will be an array of strings over the network; When it hits the service, it will be mapped to the entity type Flavor
}
