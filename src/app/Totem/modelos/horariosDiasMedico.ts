export interface IHorariosDiaMedico {
    Horarios: IHorario[]
    Codigo: number
    Mensaje: any
    IdRequest: any
    Exito: boolean
    Mensajes: any[]
    HasException: boolean
  }
  
  export interface IHorario {
    Hora: string
    IdTurno: number
  }

  export class Horario implements IHorario{
    Hora!: string
    IdTurno!: number
  } 

  export class HorarioDiaMedico implements IHorariosDiaMedico{
    Horarios!: IHorario[]
    Codigo!: number
    Mensaje: any
    IdRequest: any
    Exito!: boolean
    Mensajes!: any[]
    HasException!: boolean
  }
  