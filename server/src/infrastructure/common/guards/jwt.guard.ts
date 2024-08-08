import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['jwt']; // Assuming the JWT token is stored in a cookie named 'jwt'

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    try {
      const decoded = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key
      const role = decoded.role;

      if (role === 'admin') {
        return true;
      } else {
        throw new UnauthorizedException('Insufficient permissions');
      }
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
