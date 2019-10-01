import React, {Component} from 'react';
import {Formik, FieldArray} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Col,
  Row,
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  Label,
} from 'reactstrap';
import SweetAlert from 'sweetalert2-react';

import {URL, AXIOS} from './../../constants/API';

class CrearLibro extends Component {
  libros = {
    nombre: '',
    isbn: '',
    casa_editorial: '',
    fecha_publicacion: '',
    anio_publicacion: 0,
    categoria_id: '',
    autores: [{nombre: '', nacionalidad: '', fecha_nacimiento: ''}],
  };

  constructor(props) {
    super(props);

    this.state = {
      categorias: [],
      sweet: {
        show: false,
        mensaje: "",
        type : ""
      }
    };
  }

  componentDidMount() {
    this.listar_categorias();
  }

  listar_categorias() {
    AXIOS.get('categorias')
      .then(respuesta => respuesta.data)
      .then(datos => {
        this.setState({
          categorias: datos.data,
        });
      })
      .catch();
  }

  crear_option_categoria() {
    return this.state.categorias == null ? (
      <option value="">Seleccione</option>
    ) : (
      this.state.categorias.map((categoria, i) => (
        <option key={i} value={categoria._id}>
          {categoria.nombre}
        </option>
      ))
    );
  }

  guardar(valores) {
    AXIOS.post("libros", valores).then(respuesta =>{
      if(respuesta.data.ok){
        this.setState({
          sweet : {
            show: true,
            mensaje: "Se registro",
            type: "success"
          }
        });
      }else{
        this.setState({
          sweet : {
            show: true,
            mensaje: "No se registro",
            type: "error"
          }
        });
      }
    }).catch(error => {
      this.setState({
          sweet : {
            show: true,
            mensaje: error.message,
            type: "error"
          }
        });
    });
  }

  render() {
    return (
      <div>
        <SweetAlert
          show={this.state.sweet.show}
          title="Alerta"
          text={this.state.sweet.mensaje}
          type={this.state.sweet.type}
          onConfirm={() => this.setState({ sweet: {show:false} })}
        />
        <Card title="Crear Libro">
          <CardHeader>
            <h3>Crear libro</h3>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={this.libros}
              onSubmit={(values, {setSubmitting}) => {
                this.guardar(values);
                setSubmitting(false);
              }}
              validationSchema={Yup.object().shape({
                isbn: Yup.string().required('Required'),
                nombre: Yup.string().required('Required'),
              })}
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,
                } = props;

                return (
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col>
                        <label>ISBN</label>
                        <Input
                          id="isbn"
                          type="text"
                          value={values.isbn}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.isbn && touched.isbn
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        {errors.isbn && touched.isbn && (
                          <div className="input-feedback">{errors.isbn}</div>
                        )}
                      </Col>
                      <Col>
                        <label>Nombre</label>
                        <Input
                          id="nombre"
                          type="text"
                          value={values.nombre}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.nombre && touched.nombre
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        {errors.nombre && touched.nombre && (
                          <div className="input-feedback">{errors.nombre}</div>
                        )}
                      </Col>
                      <Col>
                        <label>Casa Editorial</label>
                        <Input
                          id="casa_editorial"
                          type="text"
                          value={values.casa_editorial}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.casa_editorial && touched.casa_editorial
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        {errors.casa_editorial && touched.casa_editorial && (
                          <div className="input-feedback">
                            {errors.casa_editorial}
                          </div>
                        )}
                      </Col>
                    </Row>
                    <br />

                    <Row>
                      <Col>
                        <label>Fecha Publicacion</label>
                        <Input
                          id="fecha_publicacion"
                          type="date"
                          value={values.fecha_publicacion}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.fecha_publicacion &&
                            touched.fecha_publicacion
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        {errors.fecha_publicacion &&
                          touched.fecha_publicacion && (
                            <div className="input-feedback">
                              {errors.fecha_publicacion}
                            </div>
                          )}
                      </Col>
                      <Col>
                        <label>Año Publicacion</label>
                        <Input
                          id="anio_publicacion"
                          type="number"
                          value={values.anio_publicacion}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.anio_publicacion && touched.anio_publicacion
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        {errors.anio_publicacion &&
                          touched.anio_publicacion && (
                            <div className="input-feedback">
                              {errors.anio_publicacion}
                            </div>
                          )}
                      </Col>
                      <Col>
                        <label>Categoria</label>
                        <select
                          id="categoria_id"
                          value={values.categoria_id}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.categoria_id && touched.categoria_id
                              ? 'form-control error'
                              : 'form-control'
                          }
                        >
                          {this.crear_option_categoria()}
                        </select>
                        {errors.categoria_id && touched.categoria_id && (
                          <div className="input-feedback">
                            {errors.categoria_id}
                          </div>
                        )}
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <FieldArray
                          name="autores"
                          render={arrayHelpers => (
                            <div>
                              {values.autores && values.autores.length > 0 ? (
                                values.autores.map((autor, index) => (
                                  <div key={index}>
                                    <Row>
                                      <Col>
                                        <Label>Nombre</Label>
                                        <Input
                                          name={`autores[${index}].nombre`}
                                          value={autor.nombre}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </Col>
                                      <Col>
                                        <Label>Fecha Nacimiento</Label>
                                        <Input
                                          type="date"
                                          name={`autores[${index}].fecha_nacimiento`}
                                          value={autor.fecha_nacimiento}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </Col>
                                      <Col>
                                        <Label>Nacionalidad</Label>
                                        <Input
                                          name={`autores[${index}].nacionalidad`}
                                          value={autor.nacionalidad}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </Col>
                                      <Col md="1">
                                        <br />
                                        <Button
                                          color="danger"
                                          type="button"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          } // remove a friend from the list
                                        >
                                          -
                                        </Button>
                                      </Col>
                                    </Row>
                                    <br />
                                  </div>
                                ))
                              ) : (
                                <Row>
                                  <Col className="align-items-center">
                                    <Button
                                      color="success"
                                      type="button"
                                      onClick={() =>
                                        arrayHelpers.push({
                                          nombre: '',
                                          nacionalidad: '',
                                          fecha_nacimiento: '',
                                        })
                                      }
                                    >
                                      Agregar autores
                                    </Button>
                                  </Col>
                                </Row>
                              )}
                              <Row>
                                      <Col className="text-center">
                                        <Button
                                          color="success"
                                          type="button"
                                          onClick={() =>
                                            arrayHelpers.push({
                                              nombre: '',
                                              nacionalidad: '',
                                              fecha_nacimiento: '',
                                            })
                                          }
                                        >
                                          +
                                        </Button>
                                      </Col>
                                    </Row>
                            </div>
                          )}
                        />
                      </Col>
                    </Row>

                    <br />

                    <Button
                      type="button"
                      className="outline"
                      onClick={handleReset}
                      disabled={!dirty || isSubmitting}
                    >
                      Cancelar
                    </Button>
                    <Button
                      color="success"
                      className="pull-right"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Guardar
                    </Button>
                  </form>
                );
              }}
            </Formik>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default CrearLibro;
