export class Usuario {
    _id?: string;
    email?: string;
    telefono?: number;
    // personId: string; Necesario?
    ndoc: number;
    tipoDoc: string;
    numTramite?: number;
    fechaNacimiento?: string;
    tsFechaNacimiento?: number;
    password?: string;
    preguntaSecreta?: string;
    respuestaSecreta?: string;
    isUsuarioWeb?: boolean;
    nombre?: string;
    apellido?: string;
    username?: string;
  }