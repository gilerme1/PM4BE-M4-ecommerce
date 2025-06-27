/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization; // 'authorization' suele venir en minúsculas

        if (!authHeader) {
        return false;
        }
        // Desestructura el header para obtener el tipo de autenticación y las credenciales.
        const [type, credentialsString] = authHeader.split(' ');
        // Verifica que el tipo sea 'Basic' y que haya dos partes.
        if (type !== 'Basic' || !credentialsString) {
            return false;
        }
        // Desestructura las credenciales (email y password).
        const [email, password] = credentialsString.split(':');

        // Verifica que existan tanto el email como el password.
        if (!email || !password) {
            return false;
        }

        return true;
    }
}
