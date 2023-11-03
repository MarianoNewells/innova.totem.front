import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recepcion-retirar-estudio',
  templateUrl: './recepcion-retirar-estudio.component.html',
  styleUrls: ['./recepcion-retirar-estudio.component.css']
})
export class RecepcionRetirarEstudioComponent implements OnInit {
 
  ngOnInit(): void {
    this.mostrarHora()
  }

  hora: any;
  mostrarHora() {
    setInterval(() => {
      this.hora = new Date();
    }, 1000);
  }

}
