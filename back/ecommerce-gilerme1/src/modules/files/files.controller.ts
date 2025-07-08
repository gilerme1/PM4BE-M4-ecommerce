/* eslint-disable prettier/prettier */
import {
    Controller,
    Post,
    Param,
    UploadedFile,
    UseInterceptors,
    ParseUUIDPipe,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('image'))
    async uploadProductImage(
        @Param('id', ParseUUIDPipe) id: string,
        @UploadedFile(
        new ParseFilePipe({
            validators: [
            new MaxFileSizeValidator({ maxSize: 200_000 }),
            new FileTypeValidator({ fileType: 'image/(jpeg|png|webp)' }),
            ],
            fileIsRequired: true,
        }),
        ) file: Express.Multer.File,
    ) {
        if (!file) throw new BadRequestException('No se recibió archivo');
        const result = await this.filesService.uploadProductImage(id, file);

        return {
        message: 'Imagen subida correctamente',
        imageUrl: result.imageUrl,
        fileId: result.fileId,
        };
    }
}
