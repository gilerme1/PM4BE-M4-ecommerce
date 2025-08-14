/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../roles/roles.enum';
import { ROLES_KEY } from '../roles/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // 1. Obtener los roles requeridos para la ruta/método actual.
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>( ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
        ]);

        if (!requiredRoles) return true;
        
        // 3. Obtener el objeto `request` de la petición HTTP y extraer el `user`.
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // 4. Verificar si el usuario autenticado tiene el rol requerido.
        const hasRole = () => requiredRoles.includes(user?.role);

        // 5. Validar la condición de acceso:
        const valid = user && user.role && hasRole();

        // 6. Si la validación falla (el usuario no cumple con los requisitos de rol)
        if (!valid) {
        throw new ForbiddenException( 'No tenés permiso para acceder a esta ruta' );
        }
        return valid;
    }
}

