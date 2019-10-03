import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    }
})

export interface IUser extends Document {
    username: string,
    password: string,
    rol: string,
    nombre: string
}