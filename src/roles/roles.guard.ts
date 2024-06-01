import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './enums/roles.enums';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride(Role, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user || !user.role) {
      return false; // User is not authenticated or role not defined
    }

    return roles.includes(user.role);
  }
}

