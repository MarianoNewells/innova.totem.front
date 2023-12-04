import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './Totem/bienvenida/bienvenida.component';
import { DniComponent } from './Totem/dni/dni.component';
import { FechasDeNacientoComponent } from './Totem/fechas-de-naciento/fechas-de-naciento.component';
import { SeleccionDeTramiteComponent } from './Totem/seleccion-de-tramite/seleccion-de-tramite.component';
import { ListaDeTurnosComponent } from './Totem/lista-de-turnos/lista-de-turnos.component';
import { ListaDeEstudiosComponent } from './Totem/lista-de-estudios/lista-de-estudios.component';
import { RecepcionExitosaComponent } from './Totem/recepcion-exitosa/recepcion-exitosa.component';
import { ListaDeCoberturasComponent } from './Totem/lista-de-coberturas/lista-de-coberturas.component';
import { ListadoDeCentrosComponent } from './Totem/listado-de-centros/listado-de-centros.component';
import { ListadoDeServiciosPrestacionTurnosDisponiblesComponent } from './Totem/listado-de-servicios-prestacion-turnosDisponibles/listado-de-servicios-prestacion-turnosDisponibles.component';
const routes: Routes = [
  { path: '', component: BienvenidaComponent },
  { path: 'dni', component: DniComponent }, // primero
  { path: 'bienvenida', component: BienvenidaComponent }, 
  { path: 'fechasDeNacimiento', component: FechasDeNacientoComponent }, // segundo
  { path: 'seleccionDeTramite', component: SeleccionDeTramiteComponent }, // tercero
  { path: 'listaDeTurnos', component: ListaDeTurnosComponent }, // CIRCUITO APARTE
  { path: 'listaDeCentros', component: ListadoDeCentrosComponent }, 
  { path: 'listaDeEstudios', component: ListaDeEstudiosComponent },
  { path: 'listaDeCoberturas', component: ListaDeCoberturasComponent }, //  PRIMER CIRCUITO DE TURNOS
  { path: 'listadeServiciosPrestacionTurnos', component: ListadoDeServiciosPrestacionTurnosDisponiblesComponent }, // SEGUNDO CIRCUITO DE TURNOS
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
