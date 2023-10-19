import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './Totem/bienvenida/bienvenida.component';
import { DniComponent } from './Totem/dni/dni.component';
import { FechasDeNacientoComponent } from './Totem/fechas-de-naciento/fechas-de-naciento.component';
import { SeleccionDeTramiteComponent } from './Totem/seleccion-de-tramite/seleccion-de-tramite.component';
import { ListaDeTurnosComponent } from './Totem/lista-de-turnos/lista-de-turnos.component';
import { ListaDeEstudiosComponent } from './Totem/lista-de-estudios/lista-de-estudios.component';
import { RecepcionExitosaComponent } from './Totem/recepcion-exitosa/recepcion-exitosa.component';

const routes: Routes = [
  { path: '', component: BienvenidaComponent },
  { path: 'dni', component: DniComponent },
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'fechasDeNacimiento', component: FechasDeNacientoComponent },
  { path: 'seleccionDeTramite', component: SeleccionDeTramiteComponent },
  { path: 'listaDeTurnos', component: ListaDeTurnosComponent },
  { path: 'listaDeEstudios', component: ListaDeEstudiosComponent },
  { path: 'recepcionExitosa', component: RecepcionExitosaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
