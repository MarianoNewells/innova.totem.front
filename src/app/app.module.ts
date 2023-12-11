import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidaComponent } from './Totem/bienvenida/bienvenida.component';
import { DniComponent } from './Totem/dni/dni.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FechasDeNacientoComponent } from './Totem/fechas-de-naciento/fechas-de-naciento.component';
import { SeleccionDeTramiteComponent } from './Totem/seleccion-de-tramite/seleccion-de-tramite.component';
import { ListaDeTurnosComponent } from './Totem/lista-de-turnos/lista-de-turnos.component';
import { ModalTicketComponent } from './Totem/modales/modal-ticket/modal-ticket.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ListaDeEstudiosComponent } from './Totem/lista-de-estudios/lista-de-estudios.component';
import { ModalInformeComponent } from './Totem/modales/modal-informe/modal-informe.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SpinnerComponent } from './Totem/spinner/spinner.component';
import { HTTP_INTERCEPTORS  } from '@angular/common/http'
import { SpinnerInterceptor } from './Totem/servicios/interceptor';
import { RecepcionExitosaComponent } from './Totem/recepcion-exitosa/recepcion-exitosa.component';
import { ListaDeCoberturasComponent } from './Totem/lista-de-coberturas/lista-de-coberturas.component';
import {NgxPrintModule} from 'ngx-print';
import { RecepcionNoExitosaComponent } from './Totem/recepcion-no-exitosa/recepcion-no-exitosa.component';
import { RecepcionRetirarEstudioComponent } from './Totem/recepcion-retirar-estudio/recepcion-retirar-estudio.component';
import { ListadoDeCentrosComponent } from './Totem/listado-de-centros/listado-de-centros.component';
import { ListadoDeServiciosPrestacionTurnosDisponiblesComponent } from './Totem/listado-de-servicios-prestacion-turnosDisponibles/listado-de-servicios-prestacion-turnosDisponibles.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { BnNgIdleService } from 'bn-ng-idle';
import { GrillaDeTurnosComponent } from './Totem/grilla-de-turnos/grilla-de-turnos.component'; // Para detectar inactividad del usuario
import { AgGridModule } from 'ag-grid-angular';

registerLocaleData(localeEs)

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    DniComponent,
    FechasDeNacientoComponent,
    SeleccionDeTramiteComponent,
    ListaDeTurnosComponent,
    ModalTicketComponent,
    ListaDeEstudiosComponent,
    ModalInformeComponent,
    SpinnerComponent,
    RecepcionExitosaComponent,
    ListaDeCoberturasComponent,
    RecepcionNoExitosaComponent,
    RecepcionRetirarEstudioComponent,
    ListadoDeCentrosComponent,
    ListadoDeServiciosPrestacionTurnosDisponiblesComponent,
    GrillaDeTurnosComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
    NgxPrintModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    AgGridModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SpinnerInterceptor,
    multi: true,
  },BnNgIdleService],
  bootstrap: [AppComponent],
})
export class AppModule {}
