import { Component, OnInit } from '@angular/core';
import { default as conf } from 'src/assets/config.json';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  secondSessionTimeOut:number = Number(conf.server.secondsSessionTimeOut)
  title = 'innova.totem.front';

  constructor(
    private timer: BnNgIdleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Volver a la pantalla inicial por x segundos de inactividad del usuario.
    this.timer.startWatching(this.secondSessionTimeOut).subscribe((isTimedOut:boolean)=>{
      if(isTimedOut){
        this.timer.resetTimer(this.secondSessionTimeOut)
        this.router.navigate(['/']);
      }
    })
  }
}
