import { SetMetadata } from '@nestjs/common';

export const KEY_PUBLIC = 'Public';

export const Public = () => SetMetadata(KEY_PUBLIC, true);
