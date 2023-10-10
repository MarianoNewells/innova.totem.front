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

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    DniComponent,
    FechasDeNacientoComponent,
    SeleccionDeTramiteComponent,
    ListaDeTurnosComponent,
    ModalTicketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
