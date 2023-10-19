import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recepcion-exitosa',
  templateUrl: './recepcion-exitosa.component.html',
  styleUrls: ['./recepcion-exitosa.component.css']
})
export class RecepcionExitosaComponent implements OnInit {

constructor(private router: Router){}

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
