import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LibroSchema, ILibro } from './model/libros.model';
import { LibroDto } from './dto/libros.dto';

@Injectable()
export class LibrosService {

    constructor(@InjectModel("Libro") private readonly libroModel: Model<ILibro>) { }

    async guardar(libroDto: LibroDto): Promise<ILibro> {
        try {
            let libro = new this.libroModel(libroDto);
            return await libro.save();
        } catch (Exception) {
            return null;
        }
    }

    async obtener(id: string): Promise<ILibro> {
        try {
            let resultado = await this.libroModel.findById(id).populate("categoria_id").exec();
        } catch (Exception) {
            return null;
        }
    }

    async listar(): Promise<ILibro[]> {
        try {
            return await this.libroModel.find().populate("categoria_id").exec();
        } catch (Exception) {
            return null;
        }

    }

    async modificar(id: string, libroDto: LibroDto): Promise<ILibro> {
        try {
            let resultado = await this.libroModel.findByIdAndUpdate(id, libroDto, { new: true }).exec();
        } catch (Exception) {
            return null;
        }
    }
}