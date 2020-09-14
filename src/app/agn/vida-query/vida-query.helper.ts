import { Acervo } from './models/acervo.model';
import { AcervoDataList } from './models/acervodatalist.model';
import { recursosOptList } from './models/browser.campos';

export class VidaQueryHelper {
  public static buildDataList(acervosList: Acervo[]): AcervoDataList[] {
    return acervosList.map((token) => {
      const ac = new AcervoDataList();
      ac.titulo = token.metadatos.titulo_formal;
      ac.temas_raw = token.metadatos.temas_raw;
      ac.id = token['_id'];

      if (token.materials && token.materials.length > 0) {
        ac.id_externo = token.materials[0].id_externo;
      } else {
        ac.id_externo = '';
      }

      ac.productor = token.artists.title;
      ac.fecha_grabacion =
        token.metadatos.fecha_grabacion !== (null && undefined)
          ? this.formatFecha(token.metadatos.fecha_grabacion)
          : '';
      ac.fecha_filmacion =
        token.metadatos.fecha_filmacion !== (null && undefined)
          ? this.formatFecha(token.metadatos.fecha_filmacion)
          : '';
      ac.legajo = token.fondo.legajo_numero !== (null && undefined)
        ? token.fondo.legajo_numero
        : 0; // definimos que si no existe tal numero, para que no se muestre le cargamos 0 para generar un falsy

      if (token.fondo.coleccion) {
        ac.fondo_collection = token.fondo.coleccion[0].title;
      } else {
        ac.fondo_collection = '';
      }

    /* Descripción y timecodes */
      if (token.timecodes) {
        ac.timecodes = token.timecodes;
      }

      if (token.documentos) {
        ac.document = token.documentos;
      }

      // Video, Audio (1,2) - Si no existen assets, -1
      ac.id_tipo_recurso = token.assets.length > 0 ? token.assets[0].resourcetype.resourceTypeId : -1;
      ac.path_recurso = token.assets.length > 0 ? token.assets[0].path : '';
      if (token.materials && token.materials.length > 0) {
        ac.soporte = token.materials[0].titulo_formal || token.materials[0].type.title;  // Este campo define el nombre del tipo de soporte
      } else {
        ac.soporte = '';
      }
      
      ac.fecha_digitalizacion = token.metadatos['fecha_digitalizacion'] !== (null && undefined) ? this.formatFecha(token.metadatos['fecha_digitalizacion']) : '';
      return ac;

    });
  }

  private static formatFecha(fecha): string {
    const date: Date = new Date(fecha);
    let fecha_formateada: string = date.getDate() + '/' +
      (date.getMonth() + 1) + '/' + date.getFullYear();

    if (fecha_formateada === 'NaN/NaN/NaN') {
      return '';
    } else {
      return fecha_formateada;
    }
  }


  static getRecursoListByID(id : number) : string{
    if(id !== -1){
    return recursosOptList.find(recurso => recurso.key === id.toString()).label;
    }else{
      return '';
    }
  }
}
