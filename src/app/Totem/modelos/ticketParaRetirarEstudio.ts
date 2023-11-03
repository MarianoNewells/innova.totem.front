export interface ITicketParaRetirarEstudio {
    Ticket: string
    Codigo: number
    Mensaje: any
    IdRequest: any
    Exito: boolean
    Mensajes: any[]
    HasException: boolean
  }

  export class TicketParaRetirarEstudio implements ITicketParaRetirarEstudio{
    Ticket!: string
    Codigo!: number
    Mensaje: any
    IdRequest: any
    Exito!: boolean
    Mensajes!: any[]
    HasException!: boolean
  }