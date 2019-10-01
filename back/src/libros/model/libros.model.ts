import * as mongoose from 'mongoose';
import { ICategoria } from '../../categorias/model/categorias.model';

export const LibroSchema = new mongoose.Schema({
    isbn: {
        type: String, 
        required: true
    },
    nombre : {
        type: String,
        required: true
    },
    fecha_publicacion : {
        type: Date,
        required: true
    },
    anio_publicacion : {
        type: Number,
        required: true
    },
    casa_editorial: {
        type: String,
        required: true
    },
    categoria_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    autores : [{
        nombre: String, 
        fecha_nacimiento: Date,
        nacionalidad: String
    }]
});

export interface ILibro extends mongoose.Document {
    isbn: string,
    nombre: string,
    fecha_publicacion: Date,
    anio_publicacion: number,
    casa_editorial: string,
    categoria_id: ICategoria 
    autores: {}
}