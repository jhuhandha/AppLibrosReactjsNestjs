import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CategoriaSchema } from './model/categorias.model';
import { CategoriasController } from './categorias.controller';
import { CategoriaService } from "./categorias.service";

@Module({
    imports: [MongooseModule.forFeature([
        {name: 'Categoria', schema: CategoriaSchema, collection: 'categoria'}
    ])],
    controllers: [CategoriasController],
    providers: [CategoriaService]
})
export class CategoriasModule {}