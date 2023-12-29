import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { GruposComponent } from './componentes/grupos/grupos.component';
import { ParticipantesComponent } from './componentes/participantes/participantes.component';
import { JuegosComponent } from './componentes/juegos/juegos.component';
import { RegalosComponent } from './componentes/regalos/regalos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultadosComponent } from './componentes/resultados/resultados.component';
import { IndividualComponent } from './componentes/individual/individual.component';
import {DatosService} from "./servicio/datos.service";
import { HistorialIndividualComponent } from './componentes/historial-individual/historial-individual.component';
import { HistorialGrupoComponent } from './componentes/historial-grupo/historial-grupo.component';
import { GruposManualComponent } from './componentes/grupos-manual/grupos-manual.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    GruposComponent,
    ParticipantesComponent,
    JuegosComponent,
    RegalosComponent,
    ResultadosComponent,
    IndividualComponent,
    HistorialIndividualComponent,
    HistorialGrupoComponent,
    GruposManualComponent
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
