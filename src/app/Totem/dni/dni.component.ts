import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApisBackEndService } from '../servicios/apis-back-end.service';
import { Router } from '@angular/router';
import { AlertService, AlertType } from '../servicios/alert.service';
import { NodoHijo } from '../modelos/nodosHijos';

@Component({
  selector: 'app-dni',
  templateUrl: './dni.component.html',
  styleUrls: ['./dni.component.css'],
})
export class DniComponent implements OnInit {
  nodoDni: NodoHijo = new NodoHijo();
  tituloPantalla: string = '';
  numeros: FormGroup;
  radios: FormGroup;
  idNodoDni: number = 0;
  constructor(
    private api: ApisBackEndService,
    private router: Router,
    private alert: AlertService
  ) {
    this.numeros = new FormGroup({
      numero: new FormControl('37316195'),
     //numero: new FormControl('22896758'),
    });
    this.radios = new FormGroup({
      radio: new FormControl('DNI'),
    });
    const dato = sessionStorage.getItem('nodoDni');
    if (dato) {
      this.nodoDni = JSON.parse(dato);
      this.idNodoDni = this.nodoDni._Id;
      this.tituloPantalla = this.nodoDni._Nombre;
      // console.log('Dni:' + this.idNodoDni);
    }
  }

  // Pone la hora en pantalla.
  ngOnInit(): void {
    this.mostrarHora();
  }

  validaDni() {
    let numero = this.numeros.get('numero')?.value;
    let tipo = this.radios.get('radio')?.value;
    this.api.getValidaDni(tipo, numero).subscribe((data) => {
      if (data.Exito) {
        sessionStorage.setItem('Persona', JSON.stringify(data.Persona));
        // Buscar la sieguiente pantalla.
        this.api.getNodosHijos(this.idNodoDni).subscribe((datos) => {
          sessionStorage.setItem(
            'nodoFechasDeNacimiento',
            JSON.stringify(datos[0])
          );
          this.router.navigate(['fechasDeNacimiento']);
        });
      } else {
        this.alert.mostrarAlerta(data.Mensaje, AlertType.Danger, 4);
      }
    });
  }

  onClickNumero(n: string) {
    const numeroActual = this.numeros.get('numero')?.value;
    const nuevoNumero = numeroActual + n;
    this.numeros.controls['numero'].setValue(nuevoNumero);
  }

  borrar() {
    const numeroActual = this.numeros.get('numero')?.value;
    const nuevoNumero = numeroActual.substring(0, numeroActual.length - 1);
    this.numeros.controls['numero'].setValue(nuevoNumero);
  }

  volver() {
    this.router.navigate(['/']);
  }
  hora: any;
  mostrarHora() {
    setInterval(() => {
      this.hora = new Date();
    }, 1000);
  }
}
