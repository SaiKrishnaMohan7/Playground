import { Module } from '@nestjs/common';

// Fake class, just for the sake of example
class Connection {
  query(str: string) {
    return [str];
  }
}

// Nest will wait to instantiate any class that depends on this provider
@Module({
  providers: [
    {
      provide: 'COFFEE_BRANDS',
      // Note "async" here, and Promise/Async event inside the Factory function
      // Could be a database connection / API call / etc
      useFactory: async (connection: Connection): Promise<string[]> => {
        const coffeeBrands = await connection.query('SELECT * ...');
        // const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
        return coffeeBrands;
      },
      inject: [Connection], // Will inject any list of providers into the factory function
    },
  ],
})
class CoffeeBrandsModule {}
