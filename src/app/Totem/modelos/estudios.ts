export interface IEstudios {
    Estudios: IEstudio[]
    Codigo: number
    Mensaje: any
    IdRequest: any
    Exito: boolean
    Mensajes: any[]
    HasException: boolean
  }

  export class Estudios implements IEstudios{
    Estudios!: IEstudio[]
    Codigo!: number
    Mensaje!: any
    IdRequest!: any
    Exito!: boolean
    Mensajes!: any[]
    HasException!: boolean
  }
  
  export interface IEstudio {
    id: number
    FechaRealizacion: string
    FechaRealizacionString: string
    MedicoSolicitante?: string
    NombreEstudio: string
  }

  export class Estudio implements IEstudio{
    id!: number
    FechaRealizacion!: string
    FechaRealizacionString!: string
    MedicoSolicitante?: string
    NombreEstudio!: string
  }