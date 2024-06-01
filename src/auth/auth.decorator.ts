import { SetMetadata } from '@nestjs/common';

// this is a decorator for skipping authorization for some methods (In AuthGuard) reflector
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);