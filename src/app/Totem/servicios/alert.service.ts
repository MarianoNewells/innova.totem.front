import { Injectable } from '@angular/core';

export enum AlertType {
  Danger = 'danger',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  mostrarAlerta(
    message: string,
    type: AlertType,
    duracionAlertaSegundos: number = 3 // Duración predeterminada de 3 segundos
  ): void {
    const alertDiv = document.createElement('div');
    alertDiv.style.position = 'fixed';
    alertDiv.style.zIndex = '9999';
    alertDiv.classList.add('msjGlobal');
    const alertHtml = `
      <div class="row mensajeGlobal">
        <div class="col">
          <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <span>${message}</span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
      </div>`;
    alertDiv.innerHTML = alertHtml;
    document.body.appendChild(alertDiv);

    let timeoutId: number | null = null;

    const closeAlert = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      alertDiv.remove();
    };

    const closeButton = alertDiv.querySelector('.close');
    if (closeButton) {
      closeButton.addEventListener('click', closeAlert);
    }

    if (duracionAlertaSegundos) {
      timeoutId = setTimeout(closeAlert, duracionAlertaSegundos * 1000);
    } else {
      timeoutId = setTimeout(closeAlert, 3 * 1000);
    }

    alertDiv.addEventListener('mouseenter', () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    });

    alertDiv.addEventListener('mouseleave', () => {
      timeoutId = setTimeout(closeAlert, 3000); // 3 segundos
    });
  }
}
