import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CategoriaSchema } from '../categorias/model/categorias.model';
import { LibroSchema } from './model/libros.model';
import { LibrosController } from './libros.controller';
import { LibrosService } from './libros.service';

@Module({
    imports: [MongooseModule.forFeature([
        {name: 'Libro', schema: LibroSchema, collection: 'libro'},
        {name: 'Categoria', schema: CategoriaSchema, collection: 'categoria'}
    ])],
    controllers: [LibrosController],
    providers: [LibrosService]
})
export class LibrosModule {}