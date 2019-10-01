import { Controller, Get } from "@nestjs/common";

import { CategoriaService } from './categorias.service';
import { ICategoria } from './model/categorias.model';

@Controller('categorias')
export class CategoriasController {
    
    constructor(private categoriaService : CategoriaService){}

    @Get()
    async listar() {
        let respuesta = await this.categoriaService.listar();
        return {ok: true, data : respuesta};
    }
}