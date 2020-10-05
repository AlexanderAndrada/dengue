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
    sintomas? : Array<Sintomas>;
    isMedico? : boolean;
    atendidox? : string;
    pacientesAtendidos : Array<string>;
  }

  export class Sintomas {
    nauseas : boolean;
    vomitos : boolean;
    cabeza : boolean;
    sarpullido : boolean;
    ojos : boolean;
    musculares : boolean;
    description : string;
    person_id : string;
  }