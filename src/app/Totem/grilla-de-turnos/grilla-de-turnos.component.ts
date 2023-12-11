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

interface IRow {
  dia1: string;
  dia2: string;
  dia3: string;
  dia4: string;
  dia5: string;
  dia6: string;
  dia7: string;
}


@Component({
  selector: 'app-grilla-de-turnos',
  templateUrl: './grilla-de-turnos.component.html',
  styleUrls: ['./grilla-de-turnos.component.css']
})

export class GrillaDeTurnosComponent implements OnInit  {
  @ViewChild('myGrid') grid!: AgGridAngular;
  // Row Data: The data to be displayed.
  rowData: IRow[] = [
    {
      dia1: 'Voyager',
      dia2: 'NASA',
      dia3: 'Cape Canaveral',
      dia4: '1977-09-05',
      dia5: 'Titan-Centaur ',
      dia6: '',
      dia7:''
    },
    {
      dia1: 'Apollo 13',
      dia2: 'NASA',
      dia3: 'Kennedy Space Center',
      dia4: '1970-04-11',
      dia5: 'Saturn V',
      dia6: '',
      dia7:''
    },
    {
      dia1: 'Falcon 9',
      dia2: 'SpaceX',
      dia3: 'Cape Canaveral',
      dia4: '2015-12-22',
      dia5: 'Falcon 9',
      dia6: '',
      dia7:''
    },
  ];

  titCol1:string="aaa"
  titCol2:string=""
  titCol3:string=""
  titCol4:string=""
  titCol5:string=""
  titCol6:string=""
  titCol7:string=""
  // Column Definitions: Defines & controls grid columns.
  
  
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
  gridApi:any
  gridColumnApi:any
  gridOptionsDetail:any

  colDefs: ColDef<IRow>[] = [
    { field: 'dia1', colId:"col1" , headerName: "" },
    { field: 'dia2', colId:"col2",  headerName: "" },
    { field: 'dia3', colId:"col3",  headerName: "" },
    { field: 'dia4', colId:"col4",  headerName: "" },
    { field: 'dia5', colId:"col5",  headerName: "" },
    { field: 'dia6', colId:"col6",  headerName: "" },
    { field: 'dia7', colId:"col7",  headerName: "" },
  ];

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
      // Completar Fecha como Date y TituloColumna
      this.Dias.map((f)=>{
        f.Fecha = new Date(f.FechaTurno);
        const nomDia = f.Fecha.toLocaleDateString("es-ES", { weekday: 'long' }).substring(0,3).toUpperCase(); 
        const numDia = f.Fecha.toLocaleDateString("es-ES", { day: 'numeric'  }).toString(); 
        f.TituloColumna = nomDia+" "+numDia
      })
     this.fillHeadersColumns()
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
 }



