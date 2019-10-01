import { Controller, Get, Param, Post, Body, HttpException, HttpStatus, Patch } from "@nestjs/common";

import { LibrosService } from './libros.service';
import { ILibro } from "./model/libros.model";
import { LibroDto } from './dto/libros.dto';

@Controller('libros')
export class LibrosController {

    constructor(private librosService : LibrosService){}

    @Get()
    async listar(){
        let respuesta = await this.librosService.listar();
        return {ok: true, data : respuesta};
    }

    @Get(":id")
    async obtener(@Param("id") id : string){
        let respuesta = await this.librosService.obtener(id);
        if(respuesta == null){
            throw new HttpException('No se encontro el libro', HttpStatus.FORBIDDEN);
        }
        return {ok: true, data : respuesta};
    }

    @Post()
    async guardar(@Body() libroDto : LibroDto){
        let respuesta = await this.librosService.guardar(libroDto);
        if(respuesta == null){
            throw new HttpException('Ocurrio un error al guardar', HttpStatus.CONFLICT);
        }
        return {ok: true, data : respuesta};
    }

    @Patch(":id")
    async modificar(@Param("id") id : string, @Body() libroDto : LibroDto){
        let respuesta = await this.librosService.modificar(id, libroDto);
        if(respuesta == null){
            throw new HttpException('No se encontro el libro', HttpStatus.FORBIDDEN);
        }
        return {ok: true, data : respuesta};
    }
}