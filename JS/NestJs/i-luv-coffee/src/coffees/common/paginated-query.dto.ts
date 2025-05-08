import { IsOptional, Min } from 'class-validator';

export class PaginatedQueryDto {
  @IsOptional()
  // @Type(() => Number)
  @Min(0)
  offset: number;

  @IsOptional()
  // This is for converting a string to a number as over the network everything is a string; using enableImplicitConversion: true in main.ts, does this automatically
  // @Type(() => Number)
  @Min(1)
  limit: number;
}
