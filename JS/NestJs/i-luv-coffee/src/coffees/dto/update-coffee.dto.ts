import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateCoffeeDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly brand?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly flavors?: string[];
}
