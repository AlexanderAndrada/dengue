export class CondicionBusqueda {
  key: string;
  label: string;
}

export const buscarEnOptList: CondicionBusqueda[] = [
  {
    key: "title",
    label: "Título",
  },
  {
    key: "temas_raw",
    label: "Palabras clave",
  },
  {
    key: "collection",
    label: "Colección",
  },
  {
    key: "legajo",
    label: "Nº de Legajo",
  },
  {
    key: "document",
    label: "Descripción",
  },
  {
    key: 'anio_filmacion',
    label: 'Año de filmación'
  },
  {
    key: 'anio_grabacion',
    label: 'Año de grabación'
  },
  {
    key: 'anio_digitalizacion',
    label: 'Año de digitalización'
  }
];

export const tipoBusquedaOptList: CondicionBusqueda[] = [
  {
    key: "aprox",
    label: "Aproximado",
  },
  {
    key: "exact",
    label: "Termino Exacto",
  },
];
export const recursosOptList: CondicionBusqueda[] = [
  {
    key: "-1",
    label: "Todos",
  },
  {
    key: "2",
    label: "Audio",
  },
  {
    key: "1",
    label: "Video",
  },
];

export const logicaOptList: CondicionBusqueda[] = [
  {
    key: "and",
    label: "Y",
  },
  {
    key: "or",
    label: "O",
  },
  {
    key: "not",
    label: "NO",
  },
];
