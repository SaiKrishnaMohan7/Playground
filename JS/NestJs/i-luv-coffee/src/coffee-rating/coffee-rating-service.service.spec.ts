import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeRatingServiceService } from './coffee-rating-service.service';

describe('CoffeeRatingServiceService', () => {
  let service: CoffeeRatingServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeeRatingServiceService],
    }).compile();

    service = module.get<CoffeeRatingServiceService>(CoffeeRatingServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
