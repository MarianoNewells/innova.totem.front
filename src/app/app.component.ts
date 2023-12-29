import { Component, OnInit } from '@angular/core';
import { default as conf } from 'src/assets/config.json';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';
import { ApisBackEndService } from './Totem/servicios/apis-back-end.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  secondSessionTimeOut:number = 0//Number(conf.server.secondsSessionTimeOut)
  title = 'innova.totem.front';
  idNodoRaiz: number = 0;
  constructor(
    private timer: BnNgIdleService,
    private router: Router,
    private api: ApisBackEndService
  ) {}

  ngOnInit(): void {
   //**************************************************  
   // Obtener los datos de inicialización del Totem.
   //**************************************************
    this.api.getInicializacionTotem().subscribe((data) => {
      const idTerminal = data.Id;
      //console.log(idTerminal);
      const idSalaDeEspera = data.IdSalaDeEspera;
      const idCentroDeAtencion = data.IdCentroDeAtencion;
      const segundosFinSesion = data.SegundosFinSesion
      this.secondSessionTimeOut = segundosFinSesion
      //console.log('idCentroDeAtencion: ' + idCentroDeAtencion);
      sessionStorage.setItem('idTerminal', JSON.stringify(idTerminal));
      sessionStorage.setItem('idSalaDeEspera', JSON.stringify(idSalaDeEspera));
      sessionStorage.setItem('SegundosFinSesion', JSON.stringify(segundosFinSesion));
      sessionStorage.setItem(
        'idCentroDeAtencion',
        JSON.stringify(idCentroDeAtencion)
      );
   
      // Obtener el nodo raíz.
      this.api.getNodoRaiz(idTerminal).subscribe((datos) => {
        this.idNodoRaiz = datos._Id;
        // console.log('Nodo Raiz:' + this.idNodoRaiz);
        sessionStorage.setItem('idNodoRaiz', JSON.stringify(this.idNodoRaiz));
      });
      this.api.getAcciones(idTerminal).subscribe((data) => {
       sessionStorage.setItem('idAccionAutorecepcionDeTurno', JSON.stringify(data.IdAutorecepcionDeTurno));
       sessionStorage.setItem('idAccionConsultaDeEstudios', JSON.stringify(data.IdConsultaDeEstudios));
       sessionStorage.setItem('idAccionCrearTurno', JSON.stringify(data.IdCrearTurno));
    })

    // Volver a la pantalla inicial por x segundos de inactividad del usuario.
    this.timer.startWatching(this.secondSessionTimeOut).subscribe((isTimedOut:boolean)=>{
      if(isTimedOut){
        this.timer.resetTimer(this.secondSessionTimeOut)
        this.router.navigate(['/']);
      }
    })
    });   
  }
}
