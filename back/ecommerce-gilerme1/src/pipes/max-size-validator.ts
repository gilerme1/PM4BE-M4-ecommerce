/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MaxSizeValidatorPipe implements PipeTransform {
    transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
        const maxSize = 200000; // 200 KB

        if (!file || !file.size) {
        throw new BadRequestException('No se recibió ningún archivo.');
        }

        if (file.size > maxSize) {
        throw new BadRequestException('El archivo supera el tamaño máximo permitido (200KB).');
        }

        return file;
    }
}


