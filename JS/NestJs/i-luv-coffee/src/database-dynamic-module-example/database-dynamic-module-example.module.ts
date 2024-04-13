import { Module, DynamicModule } from '@nestjs/common';
import { DataSource } from 'typeorm';

// Example of a dynamic module which can be configured by the consuming module
// Modules that can be abstracted into NPM packages
type ConnectionOptions = {
  type: 'postgres' | 'mysql';
  host: string;
  port: number;
  username: string;
  password: string;
};

// ! This is a static implementation, most modules in this app are static, the one below is not
// @Module({
//   providers: [
//     {
//       provide: 'CONNECTION',
//       // Value based provider Example!
//       useValue: new DataSource({
//         username: 'postgres',
//         password: 'pass123',
//         type: 'postgres',
//         host: 'localhost',
//         port: 5432,
//       }).initialize(),
//     },
//   ],
// })

/**
 * Dynamic Module Example
 *
 * @usage
 * This module can be imported in other modules like so:
  imports: [
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT,
    })
  ]
 */
@Module({})
export class DatabaseDynamicModuleExampleModule {
  static register(connectionOptions: ConnectionOptions): DynamicModule {
    return {
      module: DatabaseDynamicModuleExampleModule,
      providers: [
        {
          provide: 'CONNECTION',
          useValue: new DataSource(connectionOptions).initialize(),
        },
      ],
    };
  }
}
