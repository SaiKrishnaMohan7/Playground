import { Module } from '@nestjs/common';

//! This custom provider is injecting a class BUT not using @Injectable()

class DevelopmentConfigService {
  // Your implementation here
}
class ProductionConfigService {
  // Your implementation here
}

// Dynamically configure providers based on env
@Module({
  providers: [
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
  ],
})
class ConfigService {
  // Your implementation here
}
