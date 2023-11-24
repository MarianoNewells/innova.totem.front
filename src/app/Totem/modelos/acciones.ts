export interface IAcciones {
  IdAutorecepcionDeTurno: number
  IdConsultaDeEstudios: number
  IdCrearTurno: number
  Codigo: number
  Mensaje: any
  IdRequest: any
  Exito: boolean
  Mensajes: any[]
  HasException: boolean
}

export class Acciones implements IAcciones{
  IdAutorecepcionDeTurno!: number
  IdConsultaDeEstudios!: number
  IdCrearTurno!: number
  Codigo!: number
  Mensaje: any
  IdRequest: any
  Exito!: boolean
  Mensajes!: any[]
  HasException!: boolean
}