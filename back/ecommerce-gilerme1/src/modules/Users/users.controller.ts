/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put, Res, HttpStatus, UseGuards, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { AuthGuard } from '../../guards/auth.guards';
import { CreateUserDto } from './createUser.dto';
import { Roles } from '../../roles/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { Role } from '../../roles/roles.enum';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get()
    async getUsers(@Res() res: Response) {
        try {
        const users = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json(users);
        } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: 'Error al obtener los usuarios',
        });
        }
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getUserById(
        @Param(
            'id', 
            new ParseUUIDPipe({
                exceptionFactory: () =>
                    new BadRequestException({
                    error: true,
                    message: 'Error de validación: UUID de usuario NO válido',
                    }),
                }),
            )
            id: string,
            @Res() res: Response,
    ) {
        try {
            const user = await this.userService.getUserById(id);
            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({
                error: true,
                message: `No existe el usuario con UUID: ${id}`,
                });
            }
            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                error: true,
                message: `Error al buscarssdfsafasdf el usuario con id: ${id}`,
            });
        }
    }

    // YA NO SE USA pasa a usarse @Post('signup')
    // @Post()  
    // async create(@Body() body: CreateUserDto, @Res() res: Response) {
    //     try {
    //         const id = await this.userService.createUser(body);
    //         return res.status(HttpStatus.CREATED).json({ id });
    //     } catch (error) {
    //         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //             error: true,
    //             message: 'Error al crear el usuario',
    //         });
    //     }
    // }

    @UseGuards(AuthGuard)
    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: Partial<CreateUserDto>, 
        @Res() res: Response,
    ) {
        try {
            const updatedId = await this.userService.updateUser(id, body);
            if (!updatedId) {
                return res.status(HttpStatus.NOT_FOUND).json({
                error: true,
                message: `No existe el usuario con id: ${id}`,
                });
        }
            return res.status(HttpStatus.OK).json({ id: updatedId });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: true,
                message: `Error al actualizar el usuario con id: ${id}`,
            });
        }
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Res() res: Response,
    ) {
        try {
            const deletedId = await this.userService.deleteUser(id);
            if (!deletedId) {
                return res.status(HttpStatus.NOT_FOUND).json({
                error: true,
                message: `No existe el usuario con id: ${id}`,
                });
            }
            return res.status(HttpStatus.OK).json({ id: deletedId });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: true,
                message: `Error al eliminar el usuario con id: ${id}`,
            });
        }
    }
}