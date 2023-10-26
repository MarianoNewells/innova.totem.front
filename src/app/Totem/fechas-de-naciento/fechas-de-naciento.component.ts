import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApisBackEndService } from '../servicios/apis-back-end.service';
import { Router } from '@angular/router';
import { AlertService, AlertType } from '../servicios/alert.service';
import { Persona } from '../modelos/dni';
import { NodoHijo } from '../modelos/nodosHijos';

@Component({
  selector: 'app-fechas-de-naciento',
  templateUrl: './fechas-de-naciento.component.html',
  styleUrls: ['./fechas-de-naciento.component.css'],
})
export class FechasDeNacientoComponent implements OnInit, AfterViewInit {
  //persona?: Persona = new Persona();
  nodoFechasDeNacimiento: NodoHijo = new NodoHijo();
  tituloPantalla: string = '';
  persona: Persona = new Persona();
  fechaLarga1: string = '';
  fechaLarga2: string = '';
  fechaLarga3: string = '';
  fechaLarga4: string = '';
  fechaLarga5: string = '';
  fechaLarga6: string = '';
  fechaCorta1: string = '';
  fechaCorta2: string = '';
  fechaCorta3: string = '';
  fechaCorta4: string = '';
  fechaCorta5: string = '';
  fechaCorta6: string = '';
  constructor(
    private api: ApisBackEndService,
    private router: Router,
    private alert: AlertService
  ) {
    const dato = sessionStorage.getItem('Persona');
    if (dato) {
      this.persona = JSON.parse(dato);
    }
    const dato_ = sessionStorage.getItem('nodoFechasDeNacimiento');
    if (dato_) {
      this.nodoFechasDeNacimiento = JSON.parse(dato_);
      this.tituloPantalla = this.nodoFechasDeNacimiento._Nombre;
    }
    // console.log('Fecha de nacimiento:' + this.nodoFechasDeNacimiento._Id);
  }
  ngOnInit(): void {
    this.mostrarHora();
  }

  ngAfterViewInit(): void {
    this.getFechasDeNacimiento();
  }

  getFechasDeNacimiento() {
    this.api
      .getFechasDeNacimiento(this.persona._fechaNacimiento)
      .subscribe((data) => {
        if (data.Exito) {
          this.fechaLarga1 = data.FechasLargas[0];
          this.fechaLarga2 = data.FechasLargas[1];
          this.fechaLarga3 = data.FechasLargas[2];
          this.fechaLarga4 = data.FechasLargas[3];
          this.fechaLarga5 = data.FechasLargas[4];
          this.fechaLarga6 = data.FechasLargas[5];
          this.fechaCorta1 = data.FechasCortas[0];
          this.fechaCorta2 = data.FechasCortas[1];
          this.fechaCorta3 = data.FechasCortas[2];
          this.fechaCorta4 = data.FechasCortas[3];
          this.fechaCorta5 = data.FechasCortas[4];
          this.fechaCorta6 = data.FechasCortas[5];
        }
      });
  }
  onClickFecha(event: Event) {
    let fecha = (event.target as HTMLElement).getAttribute('data-fecha');
    if (fecha == this.persona._fechaNacimiento) {
      // Buscar la siguiente pantalla.
      this.api
        .getNodosHijos(this.nodoFechasDeNacimiento._Id)
        .subscribe((datos) => {
          sessionStorage.setItem(
            'nodoSeleccionDeTramite',
            JSON.stringify(datos[0])
          );
          this.router.navigate(['seleccionDeTramite']);
        });
    } else {
      console.log('Fecha del evento', fecha);
      console.log('Fecha del objeto', this.persona._fechaNacimiento);
      this.alert.mostrarAlerta(
        'La fecha seleccionada es inválida',
        AlertType.Danger,
        3
      );
    }
  }
  volver() {
    this.router.navigate(['dni']);
  }
  cancelar() {
    this.router.navigate(['/']);
  }
  hora: any;
  mostrarHora() {
    setInterval(() => {
      this.hora = new Date();
    }, 1000);
  }
}
