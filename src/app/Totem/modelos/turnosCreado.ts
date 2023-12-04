export interface ITurnosCreado {
    NombreRecurso: string
    FechaConDia: string
    HoraTurno: string
    IdTurno: number
    IdRecurso: number
  }
  
  export class TurnosCreado implements ITurnosCreado{
    NombreRecurso!: string
    FechaConDia!: string
    HoraTurno!: string
    IdTurno!: number
    IdRecurso!: number
  }