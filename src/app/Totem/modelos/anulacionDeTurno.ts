export interface IAnulacionDeTurno {
    ExitoEnAnulacion: boolean
    Codigo: number
    Mensaje: string
    IdRequest: any
    Exito: boolean
    Mensajes: any[]
    HasException: boolean
  }

  export class AnulacionDeTurno implements IAnulacionDeTurno{
    ExitoEnAnulacion!: boolean
    Codigo!: number
    Mensaje!: string
    IdRequest!: any
    Exito!: boolean
    Mensajes!: any[]
    HasException!: boolean
  }