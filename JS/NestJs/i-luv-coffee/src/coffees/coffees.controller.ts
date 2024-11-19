import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  SetMetadata,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { UpdateCoffeeMappedTypesDto } from './dto/update-coffee-mapped-types.dto';
import { PaginatedQueryDto } from './common/paginated-query.dto';
import { Public } from '../common/decorators/public.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int/parse-int.pipe';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('coffees') // If docs are to be created per module. Think, each bounded context is one module (DDD)
@Controller('coffees') // The API scope; so each controller is for a specific resource/scope
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll() {
    return 'findAll3, look there';
  }

  @Get('/all2')
  findAll2(@Res() response) {
    // use the response object of the underlying framework (Express in this case)
    // Nest allows for changing the underlying framework to Fastify
    // ! Using this makes using interceptors and decorators harder
    return 'This action returns all coffees';
  }

  @ApiForbiddenResponse({ description: 'Forbidden.' })
  // @SetMetadata('isPublic', true) // Custom metadata for the route; Not good practice, better to write custom Guard
  @Public()
  @Get('/all3')
  findAll3(@Query() paginationQuery: PaginatedQueryDto) {
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param() params) {
    // all params
    return 'This action returns one coffee';
  }

  @Get(':id')
  findOne2(@Param('id' /*ParseIntPipe*/) id: string) {
    // Use a custom pipe to transform the param; Only to show how to use a pipe
    // specific param
    return `This action returns #${id} coffee`;
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    // the whole body
    return 'This action adds a new coffee';
  }

  @Post()
  create2(@Body('name') body) {
    // specific body attribute
    return `This action adds a new coffee with name: ${body}`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) // set http status for the whole response; overrides the default status 200
  create3(@Body('name') body) {
    // specific body attribute
    return `This action adds a new coffee with name: ${body}`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    // id param and the whole body
    return `This action updates #${id} coffee`;
  }

  @Patch(':id')
  update2(
    @Param('id') id: string,
    @Body() updateCoffeeDtoWithMappedTypes: UpdateCoffeeMappedTypesDto,
  ) {
    // id param and the whole body
    return `This action updates #${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // id param
    return `This action removes #${id} coffee`;
  }
}

/**
 * Dependency Injection
 *
 * When the controller is instantiated, the Nest Injector will inject the CoffeesService instance into the controller.
 * This is provided by the framework in the form of Inverson of Control (IoC) container. Do not fight this.
 *
 * CoffeesService is a provider, which is a class annotated with @Injectable() decorator, which is a singleton by default.
 * Therefore, when the app is being bootstrapped, Nest sees CoffeesController has a dependency on CoffeesService and instantiates it, caches it or
 * returns a cached instance.
 * When it looks at the CoffeesService constructor, it sees that it has dependencies on Coffee and Flavor repositories, and the DataSource
 * and repeates the same process for those dependencies. This is the dependency injection chain, which is a graph problem
 *
 * The lookup is done by the token, which is a string or a class. The token is used to identify the provider in the container.
 */
