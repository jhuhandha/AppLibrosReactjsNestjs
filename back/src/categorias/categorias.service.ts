import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

import { ICategoria } from './model/categorias.model';

@Injectable()
export class CategoriaService {

    constructor(@InjectModel("Categoria") private readonly categoriaModel : Model<ICategoria>){}

    async listar() : Promise<ICategoria[]>{
        return await this.categoriaModel.find().exec();
    }
}