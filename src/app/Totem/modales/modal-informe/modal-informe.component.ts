import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-informe',
  templateUrl: './modal-informe.component.html',
  styleUrls: ['./modal-informe.component.css']
})
export class ModalInformeComponent {
  @Input() data: string=""
}
