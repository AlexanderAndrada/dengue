
export class PreguntaSecreta {
  key: string;
  label: string;
}

const preguntasSecretas: PreguntaSecreta[] = [{
  key: 'mascota',
  label: '¿Nombre de tu mascota?',
}, {
  key: 'madre',
  label: '¿Primer nombre de tu madre?',
}, {
  key: 'hijo',
  label: '¿Primer nombre de tu hijo?',
}, {
  key: 'color',
  label: '¿Color favorito?',
}, {
  key: 'comida',
  label: '¿Comida favorita?',
}];

const turneraTableActionsList = [
  { val: 'no_definido', label: 'Elija una opción', slug: 'Elija una opción ' },
  { val: 'editone', label: 'Editar registro', slug: 'editone' },
  { val: 'reset', label: 'Limpiar selección', slug: 'reset' }
];

const sedesList = [
  { val: 'alem', label: 'Sede Alem', slug: 'alem' },
  { val: 'paseocolon', label: 'Sede Paseo Colón', slug: 'paseocolon' },
  { val: 'caseros', label: 'Sede Caseros', slug: 'caseros' }
];

const tipoConsultaList = [
  { val: 'documental', label: 'Documental', slug: 'documental', sede: 'alem' },
  { val: 'video', label: 'Video', slug: 'video', sede: 'paseocolon' },
  { val: 'audio', label: 'Audio', slug: 'audio' , sede: 'paseocolon' }
];

const turnoEstadosList = [
  { val: 'vigente', label: 'Vigente', slug: 'vigente' },
  { val: 'cancelado', label: 'Cancelado', slug: 'cancelado' },
];

export class DengueHelper {
  static getPreguntasSecretasOptList(): PreguntaSecreta[] {
    return preguntasSecretas;
  }

  static getTurneraTableActionsList() {
    return turneraTableActionsList;
  }

  static getSedesList() {
    return sedesList;
  }

  static getTipoConsultaList() {
    return tipoConsultaList;
  }

  static getTurnoEstadosList() {
    return turnoEstadosList;
  }
}
