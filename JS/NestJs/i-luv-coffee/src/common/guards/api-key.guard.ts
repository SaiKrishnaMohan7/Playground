import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isRoutePublic = this.reflector.get<boolean>(
      'Public',
      context.getHandler(), // getClass() for class-scoped guards
    );
    const request = context.switchToHttp().getRequest<Request>(); // Get access to req, res, next... Middleware!
    const authHeader = request.header('Authorization');
    const apiKey = this.configService.get('API_KEY');

    if (!isRoutePublic) {
      return false;
    }

    return authHeader === apiKey;
  }
}
