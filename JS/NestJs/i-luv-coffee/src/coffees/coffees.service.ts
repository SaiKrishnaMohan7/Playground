import { Injectable } from '@nestjs/common';

// Are for business logic so that it can be shared in the application
// Services are Providers (can inject dependencies)
// Providers also handle interactions with data sources
// Services are singletons by default

@Injectable() // This is a decorator that marks a class as a provider
export class CoffeesService {}
