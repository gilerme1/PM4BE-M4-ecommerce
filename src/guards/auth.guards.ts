/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
        throw new UnauthorizedException('Authorization header not found');
        }

        const [type, token] = authHeader.split(' ');

        if (type !== 'Bearer' || !token) {
        throw new UnauthorizedException('Bearer token not found or invalid format');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
        });

        // Añadir info útil al request
            request.user = {
                id: payload.id,
                email: payload.email,
                role: payload.role,
                iat: new Date(payload.iat * 1000),
                exp: new Date(payload.exp * 1000),
            };

            return true;
            
        } catch (error) {
            console.log('ERROR', error);
            console.log('TOKEN:', token);
            console.log('SECRET:', process.env.JWT_SECRET);
            
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
