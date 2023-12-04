export interface IPrestacionDelServicio {
    _nombreCorto: string;
    _nombreNormalizado: string;
    _idTermino: number;
    _activoActualmente: boolean;
    _instruccionesDePreparacion: string;
    _textoRTF: string;
    _necesitaImprimirseEnHojaSeparada: boolean;
    _necesitaConfirmacionFinTrabajoEnEfector: boolean;
    _esMedicinaLaboral: boolean;
    _esAgrupable: boolean;
    _PlantillasDeLaPrestacion: any; // Tipo a definir según la estructura real
    _requierePresupuesto: boolean;
    _aplicaParaTelemedicina: boolean;
    _estadoEnRelacion: boolean;
    _esConsulta: boolean;
    _IdSitioRealizacionPresentacion: number;
    _CodigosDeNomenclador: any[]; // Tipo a definir según la estructura real
    _solicitable: boolean;
    _Medicamentos: any[]; // Tipo a definir según la estructura real
    _PrefacturaArticulosComoExentos: boolean;
    _visadoPrefacturado: boolean;
    _idUsuarioVisoPrefacturado: number;
    _usuarioVisoPrefacturado: string | null;
    _prestacionesAgrupadas: any[]; // Tipo a definir según la estructura real
    _tienePrestacionesAgrupadas: boolean;
    _determinaciones: any[]; // Tipo a definir según la estructura real
    _lasDeterminacionesHanSidoInicializadas: boolean;
    _codigosDeMuestra: any[]; // Tipo a definir según la estructura real
    _configuraciones: any[]; // Tipo a definir según la estructura real
    _lasConfiguracionesHanSidoInicializadas: boolean;
    _idServicioLIS: number;
    _nombreServicioLIS: string;
    _Id: number;
    _hashCodeCalculated: boolean;
    _hashCode: number;
    _calculandoNombre: boolean;
    _Nombre: string;
    _EstaCargado: boolean;
    _ClientId: number;
  }
  
  export class PrestacionDelServicio implements IPrestacionDelServicio {
    _nombreCorto!: string;
    _nombreNormalizado!: string;
    _idTermino!: number;
    _activoActualmente!: boolean;
    _instruccionesDePreparacion!: string;
    _textoRTF!: string;
    _necesitaImprimirseEnHojaSeparada!: boolean;
    _necesitaConfirmacionFinTrabajoEnEfector!: boolean;
    _esMedicinaLaboral!: boolean;
    _esAgrupable!: boolean;
    _PlantillasDeLaPrestacion!: any; // Tipo a definir según la estructura real
    _requierePresupuesto!: boolean;
    _aplicaParaTelemedicina!: boolean;
    _estadoEnRelacion!: boolean;
    _esConsulta!: boolean;
    _IdSitioRealizacionPresentacion!: number;
    _CodigosDeNomenclador!: any[]; // Tipo a definir según la estructura real
    _solicitable!: boolean;
    _Medicamentos!: any[]; // Tipo a definir según la estructura real
    _PrefacturaArticulosComoExentos!: boolean;
    _visadoPrefacturado!: boolean;
    _idUsuarioVisoPrefacturado!: number;
    _usuarioVisoPrefacturado!: string | null;
    _prestacionesAgrupadas!: any[]; // Tipo a definir según la estructura real
    _tienePrestacionesAgrupadas!: boolean;
    _determinaciones!: any[]; // Tipo a definir según la estructura real
    _lasDeterminacionesHanSidoInicializadas!: boolean;
    _codigosDeMuestra!: any[]; // Tipo a definir según la estructura real
    _configuraciones!: any[]; // Tipo a definir según la estructura real
    _lasConfiguracionesHanSidoInicializadas!: boolean;
    _idServicioLIS!: number;
    _nombreServicioLIS!: string;
    _Id!: number;
    _hashCodeCalculated!: boolean;
    _hashCode!: number;
    _calculandoNombre!: boolean;
    _Nombre!: string;
    _EstaCargado!: boolean;
    _ClientId!: number;
  }
  