export interface ICoberturas {
    Coberturas: ICobertura[]
    Codigo: number
    Mensaje: any
    IdRequest: any
    Exito: boolean
    Mensajes: any[]
    HasException: boolean
  }
  
 export class Coberturas implements ICoberturas{
    Coberturas!: ICobertura[]
    Codigo!: number
    Mensaje: any
    IdRequest: any
    Exito!: boolean
    Mensajes!: any[]
    HasException!: boolean
 }

  export interface ICobertura {
    idCobertura: number
    Financiador: Financiador
    Plan: Plan
  }
  
  export class Cobertura implements ICobertura{
    idCobertura!: number
    Financiador!: Financiador
    Plan!: Plan
  }

  export interface Financiador {
    _razonSocial: string
    _idGerenciador: number
    _gerenciador: any
    _Sigla: string
    _VisibleAmbulatorio: boolean
    _VisibleInternado: boolean
    _visibleEnEmergencia: boolean
    _aceptaAutogestion: boolean
    _BrindarAtencionGeneral: boolean
    _activoActualmente: boolean
    _email: string
    _nombreContacto: string
    _telefono: string
    _email2: string
    _nombreContacto2: string
    _telefono2: string
    _email3: string
    _nombreContacto3: string
    _telefono3: string
    _fax: string
    _idPersonaContacto: number
    _cuit: string
    _observaciones: string
    _PathLogo: string
    _aceptaDerivaciones: boolean
    _contactoDerivaciones: string
    _telefonoDerivaciones: string
    _mailDerivaciones: string
    _obligaNroAfiliado: boolean
    _completoMascaraNroAfiliado: boolean
    _requisitosParaInternacion: any
    _misPlanes: any
    _misPrestadores: any
    _misConveniosDeFacturacion: any
    _SinConvenioConInstitucion: boolean
    _idServicioTercerizadoPropietario: number
    _servicioTercerizadoPropietario: any
    _mascara: string
    _DisponibleEnTurnosWeb: boolean
    _condicionIVA: any
    _idCondicionIVA: number
    _misBloqueos: any
    _misPadrones: any
    _domicilio: Domicilio
    _usaPadron: boolean
    _topeFacturacion: any
    _autorizador: any
    _idGrupoDeFinanciador: number
    _grupoDeFinanciador: any
    _usaPorcentajeIvaEspecial: boolean
    _requiereTokenParaAutorizacion: boolean
    _porcentajeIvaEspecial: number
    _sinInicializar: boolean
    _condicionDePago: any
    _IncluirActoBioquimicoAlPrefacturar: boolean
    _facturaCapitas: boolean
    _NombreCompleto: string
    _idTipoDeFinanciador: number
    _tipo: any
    _CodigoERP: string
    _prestador: string
    _Id: number
    _hashCodeCalculated: boolean
    _hashCode: number
    _calculandoNombre: boolean
    _Nombre: string
    _EstaCargado: boolean
    _ClientId: number
    _persona: any
  }
  
  export interface Domicilio {
    _calle: string
    _altura: any
    _torre: any
    _piso: any
    _dpto: any
    _barrio: any
    _idLocalidad: number
    _localidad: any
    _idProvincia: number
    _provincia: any
    _idPais: number
    _pais: any
    _localidadOtra: any
    _provinciaOtra: any
    _paisOtro: any
    _cp: string
    _equalityComparer: any
  }
  
  export interface Plan {
    _idMutual: number
    _Mutual: any
    _idCategoria: number
    _categoria: any
    _abonaCoseguro: boolean
    _aceptaObligatorios: boolean
    _aceptaVoluntarios: boolean
    _predeterminado: boolean
    _observaciones?: string
    _activoActualmente: boolean
    _Id: number
    _hashCodeCalculated: boolean
    _hashCode: number
    _calculandoNombre: boolean
    _Nombre: string
    _EstaCargado: boolean
    _ClientId: number
  }
  