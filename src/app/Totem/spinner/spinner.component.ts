import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../servicios/sppiner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  public spinnerMostrar$ = this.spinnerService.spinner$;
  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
  }

}
