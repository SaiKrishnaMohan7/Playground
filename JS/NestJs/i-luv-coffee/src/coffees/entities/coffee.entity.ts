import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Flavor } from './flavor.entity';

// default, the names of the table are based on the lowercase name of the class; string could be passed to override the default table name
// The module this entity is part of is importing the TypeOrmModule and using the `forFeature()` method to module aware of the entity
@Entity()
export class Coffee {
  @Column()
  brand: string;

  @Column()
  name: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column('json', { nullable: true }) // JSON type, optional field
  // flavors: string[];

  @JoinTable() // What is this? See below
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, { cascade: true }) // related object can be created or updated with the parent object; there are more options here
  flavors: Flavor[];
}

/*
 * Entities in TS are classes that represent database tables.
 * This is indicated by the `@Entity()` decorator.
 * `synchronize: true` in AppModule in the TypeORM module setup tells TypeORM to automatically create database tables based on the entities + metadata defined
 * in the class definition
 */

/*
 * The @JoinTable() decorator is used to specify the owner side of the relationship and to customize the junction table in a many-to-many relationship.
 * In this case, a `Coffee` can have many `Flavor`s, and a `Flavor` can be associated with many `Coffee`s.
 * The @JoinTable() decorator is used without parameters, so a default junction table will be created to manage the many-to-many relationship between `Coffee` and `Flavor`.
 *
 * In a many-to-many relationship, two entities are related to each other in such a way that one entity can be related to multiple instances of the other entity and vice versa.
 * For example, in this code, a `Coffee` can have many `Flavor`s, and a `Flavor` can be associated with many `Coffee`s.
 * To manage this kind of relationship, a junction table (also known as a join table or bridge table) is used in the database.
 * This table includes a foreign key for each related entity.
 *
 * In TypeORM, the `@JoinTable()` decorator is used to specify the owner side of the relationship and to customize the junction table.
 * The owner side is the entity where you place the `@JoinTable()` decorator.
 * This side is responsible for the relationship updates (insertion and removal of the relationship records in the junction table).
 *
 * Here's a breakdown of the `@JoinTable()` decorator:
 * - Without any parameters, `@JoinTable()` will generate a default junction table with a default name (a combination of the names of the two related entities) and
 * default column names.
 * - If you want to customize the junction table's name, column names, or referenced columns, you can pass an object to `@JoinTable()` with the desired properties.
 * In this code, `@JoinTable()` is used without parameters, so a default junction table will be created to manage the many-to-many relationship between `Coffee` and `Flavor`.
 */
