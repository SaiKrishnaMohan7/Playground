import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres', // should be in secret store
      password: 'pass123', // should be in secret store
      database: 'postgres', // should be in secret store
      autoLoadEntities: true,
      synchronize: true, // disable in production *WHY??*
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
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
