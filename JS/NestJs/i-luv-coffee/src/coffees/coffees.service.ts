import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { PaginatedQueryDto } from './common/paginated-query.dto';
import { Event } from './entities/event.entity';
import { ConfigService } from '@nestjs/config';

// Are for business logic so that it can be shared in the application
// Services are Providers (can inject dependencies)
// Providers also handle interactions with data sources
// Services are singletons by default

/**
 * Provider Scopes
 * - Default: Singleton; All consumers get same instance
 * - Transient: New instance for each consumer
 * - Request: New instance for each request, instance gc'd after request in completed
 *  - Implicitly, the controller using this provider will become request scoped
 *  - They can also inject, @Inject(REQUEST) request: Request, the original request object
 *  - Should be smart of memory usage and performance here but we are in JS land so... ¯\_(ツ)_/¯
 */

@Injectable() // This is a decorator that marks a class as a provider
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee) // Active Record Pattern; Repositories are auto-created by TypeORM based on the entities
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  findAll(paginationQuery: PaginatedQueryDto) {
    return this.coffeeRepository.find({
      relations: {
        flavors: true, // Relations are not loaded eagerly; Needs to be specified
      },
      skip: paginationQuery.offset,
      take: paginationQuery.limit,
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: {
        flavors: true,
      },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.getFlavorByName(name, true)),
    );
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });

    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.getFlavorByName(name)),
      ));
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      // Both coffee and event have to be saved at the same time
      // If one fails, the other should not be saved
      // Transactions are used to solve that problem but will fail
      // if txns are distributed or the app handles a lot of requests
      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async getFlavorByName(
    name: string,
    createIfNotExist?: boolean,
  ): Promise<Flavor> | null {
    const flavor = await this.flavorRepository.findOne({ where: { name } });
    if (flavor) {
      return flavor;
    }
    return createIfNotExist ? this.createFlavor(name) : null;
  }

  private async createFlavor(name: string): Promise<Flavor> {
    const flavor = await this.flavorRepository.create({ name });
    return this.flavorRepository.save(flavor);
  }
}
