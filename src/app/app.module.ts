import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { GruposComponent } from './componentes/grupos/grupos.component';
import { ParticipantesComponent } from './componentes/participantes/participantes.component';
import { JuegosComponent } from './componentes/juegos/juegos.component';
import { RegalosComponent } from './componentes/regalos/regalos.component';
import { PuntajeComponent } from './componentes/puntaje/puntaje.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultadosComponent } from './componentes/resultados/resultados.component';
import { IndividualComponent } from './componentes/individual/individual.component';
import {DatosService} from "./servicio/datos.service";

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    GruposComponent,
    ParticipantesComponent,
    JuegosComponent,
    RegalosComponent,
    PuntajeComponent,
    ResultadosComponent,
    IndividualComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [DatosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
