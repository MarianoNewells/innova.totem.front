import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisBackEndService } from '../servicios/apis-back-end.service';
import { NodoHijo } from '../modelos/nodosHijos';
import { Persona } from '../modelos/dni';
import { Cobertura, Coberturas } from '../modelos/coberturas';

@Component({
  selector: 'app-lista-de-coberturas',
  templateUrl: './lista-de-coberturas.component.html',
  styleUrls: ['./lista-de-coberturas.component.css']
})
export class ListaDeCoberturasComponent implements OnInit {
    nodoListaDeCoberturas: NodoHijo = new NodoHijo();
    tituloPantalla: string = '';
    persona: Persona = new Persona();
    nombreCompleto: string = '';
    dni: string = '';
    coberturas: Coberturas = new Coberturas();
    cobertura: Cobertura = new Cobertura();
    constructor(private api: ApisBackEndService,private router: Router){
      const dato_ = sessionStorage.getItem('nodoListaDeCoberturas');
      if (dato_) {
        this.nodoListaDeCoberturas = JSON.parse(dato_);
        this.tituloPantalla = this.nodoListaDeCoberturas._Nombre;
        // console.log('Lista de turnos:', this.nodoListaDeTurnos._Id);
      }
      const datoPersona = sessionStorage.getItem('Persona');
      if (datoPersona) {
        this.persona = JSON.parse(datoPersona);
        this.nombreCompleto =
          this.persona._apellido + ', ' + this.persona._Nombre;
          this.dni = this.persona._Documento._Numero;
      }
    }

    ngOnInit(): void {
      this.api
        .getCoberturas(this.persona._Id)
        .subscribe((datos) => {
          if (datos) {
            this.coberturas = datos;
            if (this.coberturas.Coberturas.length == 0) {
              this.tituloPantalla = 'No hay coberturas disponibles';
            }
          }
        });
      this.mostrarHora();
    }

    seleccionCobertura(index:number){
      sessionStorage.setItem('CoberturaPaciente', JSON.stringify(this.coberturas.Coberturas[index]));
      const dato_ = sessionStorage.getItem('CoberturaPaciente');
      // if (dato_) { 
      //   console.log("CoberturaPaciente:",JSON.parse(dato_));  
      // };
      this.api.getNodosHijos(this.nodoListaDeCoberturas._Id).subscribe((datosPrestaciones) => {
      sessionStorage.setItem('nodoPrestaciones', JSON.stringify(datosPrestaciones[0]));
      const dato__ = sessionStorage.getItem('nodoPrestaciones');
      if (dato__) { 
        console.log("nodoPrestaciones:",JSON.parse(dato__));  
      };
      this.router.navigate(['listadeServiciosPrestacionTurnos']);
    })
   }
  
    volver() {
      this.router.navigate(['seleccionDeTramite']);
    }

    hora: any;
    mostrarHora() {
      setInterval(() => {
        this.hora = new Date();
      }, 1000);
    }
    salir(){
      this.router.navigate(['/']);
    }
}
