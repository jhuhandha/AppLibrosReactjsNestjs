import { ICategoria } from '../../categorias/model/categorias.model';

export class LibroDto {
    isbn: string;
    nombre; string;
    fecha_publicacion: Date;
    anio_publicacion: number;
    casa_editorial: string;
    categoria_id: "";
    autores: []
}