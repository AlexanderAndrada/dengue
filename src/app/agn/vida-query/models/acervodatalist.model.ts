import { TimeCode } from "./timecode.model";
import { Document } from "./document.model";

export class AcervoDataList {
  id: string;
  titulo: string;
  id_externo: string;
  titulo_serie: string;
  fondo_collection: string;
  productor: string;
  coleccion: string;
  fecha_grabacion: string;
  fecha_filmacion: string;
  fecha_digitalizacion: string;
  legajo: number;
  genero: string;
  id_tipo_recurso: number;
  path_recurso: string;
  temas_raw: string;
  soporte: string;
  timecodes: TimeCode[];
  document: Document[];
}
