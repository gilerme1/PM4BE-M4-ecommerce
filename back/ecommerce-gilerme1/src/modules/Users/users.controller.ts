/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { User } from 'src/Interfaces/user.interface';
import { AuthGuard } from 'src/guards/auth.guards';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard)
    getUsers(@Res() res: Response) {
        const users = this.userService.getUsers();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getUserById(@Param('id') id: string, @Res() res: Response) {
        const user = this.userService.getUserById(+id);             // Number(id) = +id
        if (!user) 
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
        return res.status(HttpStatus.OK).json(user);
    }

    @Post()
    create(@Body() body: User, @Res() res: Response) {
        
        if (!body.email || !body.name || !body.password || !body.address || !body.phone) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: 'Faltan campos obligatorios' });
        }

        const id = this.userService.createUser(body);
        return res.status(HttpStatus.CREATED).json({ id });
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    update(
        @Param('id') id: string,
        @Body() body: Partial<User>,
        @Res() res: Response,
    ) {
        const updatedId = this.userService.updateUser(+id, body);
        if (!updatedId)
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'No existe' });
        return res.status(HttpStatus.OK).json({ id: updatedId });
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    delete(@Param('id') id: string, @Res() res: Response) {
        const deletedId = this.userService.deleteUser(+id);
        if (!deletedId)
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'No existe' });
        return res.status(HttpStatus.OK).json({ id: deletedId });
    }
}
