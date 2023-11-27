import { Component } from '@angular/core';
import { Persona } from '../modelos/dni';
import { Router } from '@angular/router';
import { ApisBackEndService } from '../servicios/apis-back-end.service';
import { AlertService } from '../servicios/alert.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarMonthViewDay, CalendarView } from 'angular-calendar';
import * as capitalize from 'capitalize';
import { isAfter, isBefore, isSameDay, isSameMonth, startOfDay } from 'date-fns';

@Component({
  selector: 'app-listado-de-dias-disponibles',
  templateUrl: './listado-de-dias-disponibles.component.html',
  styleUrls: ['./listado-de-dias-disponibles.component.css']
})
export class ListadoDeDiasDisponiblesComponent {
  mostrarAlerta: boolean = false;

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  clickedDate!: Date;

  clickedColumn!: number;

  locale: string = "es";
  
  tituloPantalla: string = '';
  persona: Persona = new Persona();
  nombreCompleto: string = '';
  dni: string = '';
  // turnos: Turnos = new Turnos();
  // turno: Turno = new Turno();
  idCentroDeAtencion: string = '';

  constructor(
    private api: ApisBackEndService,
    private router: Router,
    private alert: AlertService,
    private http: HttpClient,
    private modalService: NgbModal,
  ) {
  }

  RenderTurnosColores({ body }: { body: CalendarMonthViewDay[] }): void {
    const today = new Date();
  
    body.forEach((day) => {
            //VERDE CON TURNOS, CONDICIONAL SIMULADA
      if (day.date.getDate() % 2 === 1 && isAfter(day.date, today)) {
        day.backgroundColor = "rgba(0, 128, 0, 0.2)";
      }
      //GRIS SIN TURNOS, CONDICIONAL SIMULADA
      else if (isBefore(day.date, today) && !isSameDay(day.date, today)) {
        day.backgroundColor = "rgba(214, 214, 214, 0.6)";
      }
    });
  }

  esMesActual(): boolean {
    const today = startOfDay(new Date());


    return isSameMonth(this.viewDate, today);
  }
  
  cambiarDia(date: Date) {
    const today = startOfDay(new Date()); 

    if (isBefore(date, today)) {
      this.mostrarAlerta = true;
      return;
    }

    this.viewDate = date;
    this.view = CalendarView.Day;
  }
  
  ngOnInit(): void {
    this.mostrarHora();
  }

  getTituloMayuscula(str: string): string {
    return capitalize.words(str);
  }
  


  cambiarMes() {
    this.view = CalendarView.Month;
  }

  hora: any;
  mostrarHora() {
    setInterval(() => {
      this.hora = new Date();
    }, 1000);
  }
  
  volver() {
    this.router.navigate(['seleccionDeTramite']);
  }

  salir(){
    this.router.navigate(['/']);
  }
}
