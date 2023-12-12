import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular'; // Angular Grid Logic
import { ColDef } from 'ag-grid-community'; // Column Definitions Interface
import { TurnosCreado } from '../modelos/turnosCreado';
import { ApisBackEndService } from '../servicios/apis-back-end.service';
import { Router } from '@angular/router';
import { AlertService } from '../servicios/alert.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDia } from '../modelos/fechasDeTurnos';
import { HorarioDiaMedico, IHorario } from '../modelos/horariosDiasMedico';

interface IRow {
  dia1: string;
  turno1:number;
  dia2: string;
  turno2:number;
  dia3: string;
  turno3:number;
  dia4: string;
  turno4:number;
  dia5: string;
  turno5:number;
  dia6: string;
  turno6:number;
  dia7: string;
  turno7:number;
}

 export class Row implements IRow{
  dia1!: string;
  turno1!:number;
  dia2!: string;
  turno2!:number;
  dia3!: string;
  turno3!:number;
  dia4!: string;
  turno4!:number;
  dia5!: string;
  turno5!:number;
  dia6!: string;
  turno6!:number;
  dia7!: string;
  turno7!:number;
 } 


@Component({
  selector: 'app-grilla-de-turnos',
  templateUrl: './grilla-de-turnos.component.html',
  styleUrls: ['./grilla-de-turnos.component.css']
})

export class GrillaDeTurnosComponent implements OnInit  {
  @ViewChild('myGrid') grid!: AgGridAngular;
  // Row Data: The data to be displayed.
  rowData: IRow[] = [];
  Horarios: IHorario[]=[]
  // Modelo de las columnas de la grilla.
  colDefs: ColDef<IRow>[] = [
    { field: 'dia1', colId:"col1" , headerName: "" },
    { field: 'dia2', colId:"col2",  headerName: "" },
    { field: 'dia3', colId:"col3",  headerName: "" },
    { field: 'dia4', colId:"col4",  headerName: "" },
    { field: 'dia5', colId:"col5",  headerName: "" },
    { field: 'dia6', colId:"col6",  headerName: "" },
    { field: 'dia7', colId:"col7",  headerName: "" },
  ];

  // Títulos de las columnas.
  titCol1:string="aaa"
  titCol2:string=""
  titCol3:string=""
  titCol4:string=""
  titCol5:string=""
  titCol6:string=""
  titCol7:string=""
  themeClass:string ="ag-theme-quartz";
  turno:TurnosCreado=new TurnosCreado
  idRecurso:number=2504
  idServicioSeleccionado:number=274
  idCentroDeAtencion:number=6
  idPrestacion:number=885040
  idPlan:number=1275
  Dias: IDia[]=[]
  activePos:number=0
  lastPos:number=6
  max:number=0

  constructor( private api: ApisBackEndService,
    private router: Router,
    private alert: AlertService,
    private http: HttpClient,
    private modalService: NgbModal,){
  //   let d = sessionStorage.getItem("turnoSeleccionado")
  //   if(d){
  //     this.turno = JSON.parse(d)
  //   }
  //  this.idRecurso=this.turno.IdRecurso
  //   d = sessionStorage.getItem("idServicioSeleccionado")
  //   if(d){
  //     this.idServicioSeleccionado = Number(JSON.parse(d))
  //   }
  //   d = sessionStorage.getItem('idCentroDeAtencion');
  //   if(d){
  //     this.idCentroDeAtencion = Number(JSON.parse(d))
  //   }
  //   d = sessionStorage.getItem('idPrestacion');
  //   if(d){
  //     this.idPrestacion = Number(JSON.parse(d))
  //   }
  //   d = sessionStorage.getItem('idPlan');
  //   if(d){
  //     this.idPlan = Number(JSON.parse(d))
  //   } 
   
 
  }
  
  ngOnInit(): void {
    this.api.getFechasTurnosDelMedico(this.idRecurso,this.idServicioSeleccionado,this.idCentroDeAtencion,0,this.idPrestacion,this.idPlan).subscribe((data)=>{
      this.Dias = data.Dias
      // Completar las propiedades Fecha como Date y TituloColumna
      this.Dias.map((f)=>{
        f.Fecha = new Date(f.FechaTurno);
        const nomDia = f.Fecha.toLocaleDateString("es-ES", { weekday: 'long' }).substring(0,3).toUpperCase(); 
        const numDia = f.Fecha.toLocaleDateString("es-ES", { day: 'numeric'  }).toString(); 
        f.TituloColumna = nomDia+" "+numDia
      })
     this.fillHeadersColumns()
     this.fillDataGrid()
    })
  }
 
 fillHeadersColumns(){
  this.completarTitulosColumnas()
  const def = this.grid.api.getColumnDefs()
  if(def){
    def[0].headerName=this.titCol1
    def[1].headerName=this.titCol2
    def[2].headerName=this.titCol3
    def[3].headerName=this.titCol4
    def[4].headerName=this.titCol5
    def[5].headerName=this.titCol6
    def[6].headerName=this.titCol7
  }
  this.grid.api.setGridOption("columnDefs",def)
  this.grid.api.refreshHeader()
 }
 
  completarTitulosColumnas(){
    let cont=0
    for (let i = this.activePos; i < this.lastPos+1; i++) {
        cont++
        switch(cont){
          case 1:
            this.titCol1 = this.Dias[i].TituloColumna
            break
          case 2:
            this.titCol2 = this.Dias[i].TituloColumna
            break  
        case  3:
            this.titCol3 = this.Dias[i].TituloColumna
            break 
        case  4:
          this.titCol4 = this.Dias[i].TituloColumna
          break 
        case  5:
          this.titCol5 = this.Dias[i].TituloColumna
            break
        case  6:
            this.titCol6 = this.Dias[i].TituloColumna
            break
        case  7:
          this.titCol7 = this.Dias[i].TituloColumna
          break                               
        }
      }
    }
 
 fillDataGrid(){
    let cont=0
    // Recorrer por las posiciones de las fechas de la semana activa.
    for (let i = this.activePos; i < this.lastPos+1; i++) {
      const Fecha:Date = this.Dias[i].Fecha
      // Buscar los horarios de la fecha
      this.api.getHorariosDiaMedico(this.idRecurso,this.idServicioSeleccionado,this.idCentroDeAtencion,0,this.idPrestacion,Fecha).then((data)=>{
        cont++ // Posicionar la columna que se va a completar
        this.Horarios = data.Horarios

        // Crear la cantidad de filas que necesita el datasource de la grilla.
        if(this.Horarios.length>this.max)
        { 
          let dif = this.Horarios.length-this.max
          for (let j = 1; j < dif+1; j++) {
            let r : Row = new Row 
            r.dia1=""
            r.turno1=0
            r.dia2=""
            r.turno2=0
            r.dia3=""
            r.turno3=0
            r.dia4=""
            r.turno4=0
            r.dia5=""
            r.turno5=0
            r.dia6=""
            r.turno6=0
            r.dia7=""
            r.turno7=0
            this.rowData.push(r)
          }
          this.max=this.Horarios.length
        }
       
        // Iterar los horarios que trajo el get y llenar verticalmente una columna.
        this.Horarios.forEach((h,index)=>{ 
            switch(cont){
              case 1:
                this.rowData[index].dia1 = h.Hora
                this.rowData[index].turno1 = h.IdTurno
                break
              case 2:
                this.rowData[index].dia2 = h.Hora
                this.rowData[index].turno2 = h.IdTurno
                break  
            case  3:
              this.rowData[index].dia3 = h.Hora
              this.rowData[index].turno3 = h.IdTurno
                break 
            case  4:
              this.rowData[index].dia4 = h.Hora
              this.rowData[index].turno4 = h.IdTurno
              break 
            case  5:
              this.rowData[index].dia5 = h.Hora
              this.rowData[index].turno5 = h.IdTurno
                break
            case  6:
              this.rowData[index].dia6 = h.Hora
              this.rowData[index].turno6 = h.IdTurno
                break
            case  7:
              this.rowData[index].dia7 = h.Hora
              this.rowData[index].turno7 = h.IdTurno
              break                               
            }

        }) // this.Horarios.forEach 
        this.grid.api.setGridOption("rowData",this.rowData)
        this.grid.api.refreshCells()
      })//this.api.getHorariosDiaMedico  
    }//for (let i = this.activePos; i < this.lastPos+1; i++)
   }   
 }



