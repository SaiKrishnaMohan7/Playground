import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { CoffeeRatingServiceService } from './coffee-rating/coffee-rating-service.service';
import { DatabaseDynamicModuleExampleModule } from './database-dynamic-module-example/database-dynamic-module-example.module';
import { ConfigModule } from '@nestjs/config';
import Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // default, will look at root
      ignoreEnvFile: process.env.NODE_ENV === 'production', // ignore .env file in production
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }), // Will merge definitions in process.env and .env file
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, // disable in production *WHY??*
    }),
    CoffeeRatingModule,
    DatabaseDynamicModuleExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService, CoffeeRatingServiceService],
})
export class AppModule {}

/**
 * Why disable `synchronize` in production?
 * The `synchronize: true` option in a TypeORM configuration automatically creates database tables on every application launch.
 * It's a handy feature during development because it allows you to modify your entities and have those changes
 * reflected in the database schema without having to manually alter tables.
 *
 * However, in a production environment, this can be risky for the following reasons:
 *
 * 1. Performance: Synchronization is a resource-intensive operation. If your application restarts frequently, this could lead to unnecessary load on your database.
 * 2. Data loss: If you remove a column from an entity, TypeORM will remove that column from the database on the next synchronization, potentially leading to data loss.
 * 3. Uncontrolled migrations: In a production environment, you typically want to have controlled migrations.
 *  This means you want to explicitly define how your database schema changes over time, which is not possible with automatic synchronization.
 */
