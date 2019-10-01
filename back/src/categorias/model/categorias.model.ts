import * as mongoose from 'mongoose';

export const CategoriaSchema = new mongoose.Schema({
    nombre: String
});

export interface ICategoria extends mongoose.Document {
    nombre: string
}