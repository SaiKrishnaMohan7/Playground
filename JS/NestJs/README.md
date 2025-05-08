#javascript #nodejs #nestjs

Is a backend framework built atop express for the NodeJS runtime. It is opinionated but the opinions seem to be in line with my own for web apps. Works really well enterprise software

![[Screenshot 2023-05-26 at 1.26.42 PM.png]]
- npx @nestjs/cli new project-name (https://stackoverflow.com/questions/57266622/unable-to-create-a-new-project-with-the-nest-cli#57270151)
- Modules are [[SingletonPattern|singletons]]; There will ever be only one instance of a module and hence can be shared, just like application state
	- Root module is the starting point of the application
	- offers scopes and boundaries
	- one folder / module
	- `@Module `decorator used to provide nestjs some metadata to understand app strucuture by building a dependency graph
		- **providers**: providers available via dependency injection
		- **controllers**: array of controllers to be instantiated; gets inbound requests and sends out responses
		- **exports**: Porviders to export
		- **imports**: modules required by this module
![[Screenshot 2023-05-26 at 8.45.25 PM.png]]![[Screenshot 2023-05-26 at 8.58.59 PM.png]]

## How to use this repo?

Sai is getting older and forgetful so there nice details written in comments in every file

- The branch, `nest/basics_database_rdbms`, is where the rdbms setup happens
	- Looking through the commit messages will give a decent structure to all this madness
	- [PR](https://github.com/SaiKrishnaMohan7/Playground/pull/90)
- The branch, `nest/basics_database_nosql`, is where the nosql db setup happens

Therefore, the notes will diverge accordingly.

## Modules

- Modules are a schematic
	- npx @nestjs/cli generate schematic

## Controllers

- bound to a path
- has route handlers
- created by decorating a class with `@Controller()` decorato

## Providers

- Any class can be made a provider by decorating with `@Injectable()`decorator, which makes it possible for it to be pulled in to the constructor via dependency injection
- Must be defined in the scope of module for it to be used by the module or has to be imported there or should be paort of the `@Global` module scope for it to be pulled in
- can be a plain value, a class or a factory fn [[Factory Pattern]]

## Services

- Defined as Provider; not all Providers are services
- Is also a [[SingletonPattern|singleton]] when decorated with `@Injectable()` decorator
- This is where business logic will sit
	- ex: called from a controller to validate some logic
	- Can be thought of [[DDD - Domian Driven Design#Domains|Domains]] more like a domain could be modelled as a service
- Nest JS recommends to use JS Classes as [[DTO - Data Transfer Object]] as post compilation (ts to js more like transpilation) interfaces and types are not in the code anymore

## Pipes

- Used for schema validation (req validation) and transformation
- Can throw exceptions that is consumed by NestJS and parsed into an error
- pipes are async
- There are some useful pipes in NestJS
	- Validation Pipe
	- ParseInt Pipe
- Are classes decorated with `@Injectable()` decorator
	- Must impletment interface `PipeTransform`, therefore, there will be a `transform(value, metadata)` method defined for every validator
	- Maybe they are implemented as streams
- Handler level pipes are defined via `@UsePipes(SomePipe)`
	- They are middlewares
![[Screenshot 2023-05-27 at 1.14.32 PM.png]]
- Parameter level pipes
	- defined at parameter level
![[Screenshot 2023-05-27 at 1.18.04 PM.png]]
- Global pipes
	- defined at the application level
![[Screenshot 2023-05-27 at 1.19.48 PM.png]]

## TypeORM

- is the Object Relational Mapper (one of them) supported by nest
### Active Record Pattern

```typescript
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    isActive: boolean
}
```

- All active-record entities must extend the `BaseEntity` class, which provides methods to work with the entity. Example of how to work with such entity:

```typescript
// example how to save AR entity
const user = new User()
user.firstName = "Timber"
user.lastName = "Saw"
user.isActive = true
await user.save()

// example how to remove AR entity
await user.remove()

// example how to load AR entities
const users = await User.find({ skip: 2, take: 5 })
const newUsers = await User.findBy({ isActive: true })
const timber = await User.findOneBy({ firstName: "Timber", lastName: "Saw" })
```

- All methods used to interact with the Entity are on the entity [ActiveRecord](https://en.wikipedia.org/wiki/Active_record_pattern)
	- Good for small apps

### Data Mapper Pattern

- All methods used to interact with the Entity is through an intermediary (CAMS uses this style)
	- Good for large apps
	- Is a Data Access Layer
- Using the Data Mapper approach, you define all your query methods in separate classes called "repositories", and you save, remove, and load objects using repositories. In data mapper your entities are very dumb - they just define their properties and may have some "dummy" methods. [Data Mapper Pattern](https://en.wikipedia.org/wiki/Data_mapper_pattern)

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    isActive: boolean
}
```

```typescript
const userRepository = dataSource.getRepository(User)

// example how to save DM entity
const user = new User()
user.firstName = "Timber"
user.lastName = "Saw"
user.isActive = true
await userRepository.save(user)

// example how to remove DM entity
await userRepository.remove(user)

// example how to load DM entities
const users = await userRepository.find({ skip: 2, take: 5 })
const newUsers = await userRepository.findBy({ isActive: true })
const timber = await userRepository.findOneBy({
    firstName: "Timber",
    lastName: "Saw",
})
```

## Authentication and Authorization

- NestJs supports [[JWT]] and Passport JS for authentication using JWTs
- We can user `@UseGuards(AuthGuard())`(which are the authentication middleware that you write in express; AuthGuard is from passport JS)
	- This adds the user object to the request

### Interceptors

- I think are closer to middlewares in express, they can intercept a req, process or transform the data.
	- Can be applied at global (app) level, handler level or param level

## Commands run
- look up nest js cli things, they can make mundane stuff convenient
- nest cli + copilot cli will help even more
