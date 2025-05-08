import { registerAs } from '@nestjs/config';

// registerAs allows to define and register a custom configuration object
export default registerAs('coffees', () => ({
  foo: 'bar',
}));
