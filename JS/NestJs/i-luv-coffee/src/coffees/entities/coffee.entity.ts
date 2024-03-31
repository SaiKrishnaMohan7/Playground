import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// default, the names of the table are based on the lowercase name of the class; string could be passed to override the default table name
// The module this entity is part of is importing the TypeOrmModule and using the `forFeature()` method to module aware of the entity
@Entity()
export class Coffee {
  @Column()
  brand: string;

  @Column()
  name: string;

  @PrimaryGeneratedColumn()
  id: string;

  @Column('json', { nullable: true }) // JSON type, optional field
  flavors: string[];
}

/**
 * Entities in TS are classes that represent database tables.
 * This is indicated by the `@Entity()` decorator.
 * `synchronize: true` in AppModule in the TypeORM module setup tells TypeORM to automatically create database tables based on the entities + metadata defined
 * in the class definition
 */
