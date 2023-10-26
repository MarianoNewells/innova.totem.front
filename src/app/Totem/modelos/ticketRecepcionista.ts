export interface ITicketRecepcionista {
    ReporteTicketRecepcionistaString: string
    Codigo: number
    Mensaje: any
    IdRequest: any
    Exito: boolean
    Mensajes: any[]
    HasException: boolean
  }

  export class TicketRecepcionista implements ITicketRecepcionista{
    ReporteTicketRecepcionistaString!: string
    Codigo!: number
    Mensaje: any
    IdRequest: any
    Exito!: boolean
    Mensajes!: any[]
    HasException!: boolean
  }
  