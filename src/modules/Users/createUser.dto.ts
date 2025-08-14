/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'Juan Pérez' })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    @ApiProperty({ example: 'juan@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Password123!',
        description: 'Debe tener una mayúscula, una minúscula, un número y un carácter especial.',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
        message:
        'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial (!@#$%^&*)',
    })
    password: string;

    @ApiProperty({ example: 'Calle Falsa 123' })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @ApiProperty({ example: '+59891234567' })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({ example: 'Uruguay' })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string;

    @ApiProperty({ example: 'Montevideo' })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string;
}
