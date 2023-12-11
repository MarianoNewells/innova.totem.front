export interface IFechasDeTurnos {
    Dias: IDia[]
    Codigo: number
    Mensaje: any
    IdRequest: any
    Exito: boolean
    Mensajes: any[]
    HasException: boolean
  }
  
  export interface IDia {
    FechaTurno: string
    FechaComoString: string
    TituloColumna:string
    Fecha:Date  
}
  
  export class Dia implements IDia{
    FechaTurno!: string
    FechaComoString!: string
    TituloColumna!:string
    Fecha!:Date
  }

  export class FechasDeTurnos{
    Dias!: IDia[]
    Codigo!: number
    Mensaje: any
    IdRequest: any
    Exito!: boolean
    Mensajes!: any[]
    HasException!: boolean
  }