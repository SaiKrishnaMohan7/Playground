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
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees') // The API scope; so each controller is for a specific resource/scope
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll() {
    return 'This action returns all coffees';
  }

  @Get()
  findAll2(@Res() response) {
    // use the response object of the underlying framework (Express in this case)
    // Nest allows for changing the underlying framework to Fastify
    // ! Using this makes using interceptors and decorators harder
    return 'This action returns all coffees';
  }

  @Get()
  findAll3(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
  }

  @Get(':id')
  findOne() {
    // all params
    return 'This action returns one coffee';
  }

  @Get(':id')
  findOne2(@Param('id') id: string) {
    // specific param
    return `This action returns #${id} coffee`;
  }

  @Post()
  create(@Body() body) {
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
  update(@Param('id') id: string, @Body() body) {
    // id param and the whole body
    return `This action updates #${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // id param
    return `This action removes #${id} coffee`;
  }
}
