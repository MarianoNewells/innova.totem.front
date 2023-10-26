import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recepcion-no-exitosa',
  templateUrl: './recepcion-no-exitosa.component.html',
  styleUrls: ['./recepcion-no-exitosa.component.css']
})
export class RecepcionNoExitosaComponent implements OnInit{
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
