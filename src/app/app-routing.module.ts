import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent} from './componentes/inicio/inicio.component';
import { GruposComponent} from './componentes/grupos/grupos.component';
import { PuntajeComponent} from './componentes/puntaje/puntaje.component';
import { JuegosComponent} from './componentes/juegos/juegos.component';
import { ParticipantesComponent} from './componentes/participantes/participantes.component';
import { RegalosComponent} from "./componentes/regalos/regalos.component";


const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'grupos', component: GruposComponent },
  { path: 'puntaje', component: PuntajeComponent },
  { path: 'juegos', component: JuegosComponent },
  { path: 'participantes', component: ParticipantesComponent },
  { path: 'regalos', component: RegalosComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
