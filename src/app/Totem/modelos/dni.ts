export interface IDni {
  Persona: IPersona;
  Codigo: number;
  Mensaje: any;
  IdRequest: any;
  Exito: boolean;
  Mensajes: any[];
  HasException: boolean;
}

export class Dni implements IDni {
  Persona!: IPersona;
  Codigo!: number;
  Mensaje!: any;
  IdRequest!: any;
  Exito!: boolean;
  Mensajes!: any[];
  HasException!: boolean;
}

export interface IPersona {
  _apellido: string;
  _consentimientoRIS: boolean;
  _sexo: Sexo;
  _fechaNacimiento: string;
  _Hc: string;
  _apellidoMarido: string;
  _apellidoMaterno: string;
  _fechaFallecimiento: string;
  _fechaFallecimientoTexto: any;
  _fallecido: boolean;
  _cuil: any;
  _email: string;
  _Ocupacion_NombreActividad: string;
  _ObservacionesMedicas: string;
  _IdEstadoCivil: number;
  _estadoCivil: any;
  _idNacionalidad: number;
  _nacionalidad: any;
  _TelMensajes: TelMensajes;
  _coberturas: any;
  _estado: string;
  _nacionalidadOtra: string;
  _idEstadoEmpadronamiento: number;
  _estadoEmpadronamiento: any;
  _idUsuarioAlta: number;
  _usuarioAlta: any;
  _fechaAlta: string;
  _personaFoto: any;
  _nombreResponsable: any;
  _apellidoResponsable: any;
  _numeroDocumentoResponsable: string;
  _apellidoPaterno: any;
  _municipioDeNacimiento: any;
  _cns: any;
  _telefonoResponsable: any;
  _idTipoDeDocumento: number;
  _tipoDeDocumento: any;
  _idSituacionFamiliar: number;
  _situacionFamiliar: any;
  _idPrefijoTelefonicoFijo: number;
  _prefijoTelefonicoFijo: any;
  _idPrefijoTelefonicoCelular: number;
  _prefijoTelefonicoCelular: any;
  _idReligion: number;
  _religion: any;
  _idFactorSanguineo: number;
  _factorSanguineo: any;
  _idGrupoSanguineo: number;
  _grupoSanguineo: any;
  _idOcupacion: number;
  _ocupacion: any;
  _idPersonaSistemaExterno: number;
  _patientId: string;
  _coordenadaGeograficaX: any;
  _coordenadaGeograficaY: any;
  _idProfesionalDerivante: number;
  _profesionalDerivante: any;
  _observacionesEmpadronamiento: string;
  _tieneTratoPreferencial: boolean;
  _aliasApellido: string;
  _aliasNombre: string;
  _idGrupoEtnico: number;
  _grupoEtnico: any;
  _esAlfabetizado: any;
  _idNivelEducativo: number;
  _nivelEducativo: any;
  _esPacienteProblematico: boolean;
  _observacionesDePacienteProblematico: string;
  _observacionesDePacienteVip: string;
  _HabilitaConfirmacionDeTurnos: boolean;
  _idProveedorDeIntegracionQueEmpadrono: number;
  _proveedorExternoQueEmpadrono: any;
  _empadronadoPorSistemaExterno: boolean;
  _modificadoPorSistemaExterno: boolean;
  _idProveedorDeIntegracionQueModifico: number;
  _ActivoActualmente: boolean;
  _fechaDesactivacion: string;
  _condicionDePago: any;
  _condicionDeIVA: any;
  _Domicilio: Domicilio;
  _Observaciones: string;
  _Documento: Documento;
  _TelFijo: TelFijo;
  _TelCelular: TelCelular;
  _TS: any;
  _Id: number;
  _hashCodeCalculated: boolean;
  _hashCode: number;
  _calculandoNombre: boolean;
  _Nombre: string;
  _EstaCargado: boolean;
  _ClientId: number;
}

export class Persona implements IPersona {
  _apellido!: string;
  _consentimientoRIS!: boolean;
  _sexo!: Sexo;
  _fechaNacimiento!: string;
  _Hc!: string;
  _apellidoMarido!: string;
  _apellidoMaterno!: string;
  _fechaFallecimiento!: string;
  _fechaFallecimientoTexto!: any;
  _fallecido!: boolean;
  _cuil!: any;
  _email!: string;
  _Ocupacion_NombreActividad!: string;
  _ObservacionesMedicas!: string;
  _IdEstadoCivil!: number;
  _estadoCivil!: any;
  _idNacionalidad!: number;
  _nacionalidad!: any;
  _TelMensajes!: TelMensajes;
  _coberturas!: any;
  _estado!: string;
  _nacionalidadOtra!: string;
  _idEstadoEmpadronamiento!: number;
  _estadoEmpadronamiento!: any;
  _idUsuarioAlta!: number;
  _usuarioAlta!: any;
  _fechaAlta!: string;
  _personaFoto!: any;
  _nombreResponsable!: any;
  _apellidoResponsable!: any;
  _numeroDocumentoResponsable!: string;
  _apellidoPaterno!: any;
  _municipioDeNacimiento!: any;
  _cns!: any;
  _telefonoResponsable!: any;
  _idTipoDeDocumento!: number;
  _tipoDeDocumento!: any;
  _idSituacionFamiliar!: number;
  _situacionFamiliar!: any;
  _idPrefijoTelefonicoFijo!: number;
  _prefijoTelefonicoFijo!: any;
  _idPrefijoTelefonicoCelular!: number;
  _prefijoTelefonicoCelular: any;
  _idReligion!: number;
  _religion!: any;
  _idFactorSanguineo!: number;
  _factorSanguineo!: any;
  _idGrupoSanguineo!: number;
  _grupoSanguineo!: any;
  _idOcupacion!: number;
  _ocupacion!: any;
  _idPersonaSistemaExterno!: number;
  _patientId!: string;
  _coordenadaGeograficaX!: any;
  _coordenadaGeograficaY!: any;
  _idProfesionalDerivante!: number;
  _profesionalDerivante!: any;
  _observacionesEmpadronamiento!: string;
  _tieneTratoPreferencial!: boolean;
  _aliasApellido!: string;
  _aliasNombre!: string;
  _idGrupoEtnico!: number;
  _grupoEtnico!: any;
  _esAlfabetizado!: any;
  _idNivelEducativo!: number;
  _nivelEducativo!: any;
  _esPacienteProblematico!: boolean;
  _observacionesDePacienteProblematico!: string;
  _observacionesDePacienteVip!: string;
  _HabilitaConfirmacionDeTurnos!: boolean;
  _idProveedorDeIntegracionQueEmpadrono!: number;
  _proveedorExternoQueEmpadrono!: any;
  _empadronadoPorSistemaExterno!: boolean;
  _modificadoPorSistemaExterno!: boolean;
  _idProveedorDeIntegracionQueModifico!: number;
  _ActivoActualmente!: boolean;
  _fechaDesactivacion!: string;
  _condicionDePago!: any;
  _condicionDeIVA!: any;
  _Domicilio!: Domicilio;
  _Observaciones!: string;
  _Documento!: Documento;
  _TelFijo!: TelFijo;
  _TelCelular!: TelCelular;
  _TS!: any;
  _Id!: number;
  _hashCodeCalculated!: boolean;
  _hashCode!: number;
  _calculandoNombre!: boolean;
  _Nombre!: string;
  _EstaCargado!: boolean;
  _ClientId!: number;
}

export interface Sexo {
  _Abreviatura: string;
  _Id: number;
  _hashCodeCalculated: boolean;
  _hashCode: number;
  _calculandoNombre: boolean;
  _Nombre: string;
  _EstaCargado: boolean;
  _ClientId: number;
}

export interface TelMensajes {
  miTextoLibre: string;
  miCaracteristica: string;
  miNumero: string;
  miRestoTexto: any;
  _esPacienteExterno: boolean;
  miTelSoloNumeros: string;
  miEsCelular: boolean;
  _Proveedor: number;
  _equalityComparer: any;
}

export interface Domicilio {
  _calle: string;
  _altura: string;
  _torre: string;
  _piso: string;
  _dpto: string;
  _barrio: string;
  _idLocalidad: number;
  _localidad: any;
  _idProvincia: number;
  _provincia: any;
  _idPais: number;
  _pais: any;
  _localidadOtra: string;
  _provinciaOtra: string;
  _paisOtro: string;
  _cp: string;
  _equalityComparer: any;
}

export interface Documento {
  _Numero: string;
  _Tipo: number;
}

export interface TelFijo {
  miTextoLibre: string;
  miCaracteristica: string;
  miNumero: string;
  miRestoTexto: any;
  _esPacienteExterno: boolean;
  miTelSoloNumeros: string;
  miEsCelular: boolean;
  _Proveedor: number;
  _equalityComparer: any;
}

export interface TelCelular {
  miTextoLibre: string;
  miCaracteristica: string;
  miNumero: string;
  miRestoTexto: string;
  _esPacienteExterno: boolean;
  miTelSoloNumeros: string;
  miEsCelular: boolean;
  _Proveedor: number;
  _equalityComparer: any;
}
