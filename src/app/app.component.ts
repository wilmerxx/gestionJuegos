import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from './servicio/datos.service';
import {Juegos} from "./modelo/juegos";
import {Regalo} from "./modelo/regalo";
import swal from "sweetalert2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'playgroup';

  constructor(private router: Router, private datosServicio: DatosService) { }
  vistaSeleccionada: 'grupo' | 'individual' | 'null' = 'null';
  vistaSeleccionadaGrupo: 'manual' | 'automatico' | 'null' = 'null';
  @Input() ganadores: any[] = [];
  juegoSeleccionado: any = null;
  regaloSeleccionado: any = null;

  seleccionarVista(vista: 'grupo' | 'individual' ) {
    if(this.participantes.length === 0 ) {
      swal.fire({
        title: 'Error',
        text: 'No hay participantes',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }else if(this.juegos.length === 0 ) {
       swal.fire({
          title: 'Error',
          text: 'No hay juegos',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return;
    }else if(this.regalos.length === 0 ) {
       swal.fire({
          title: 'Error',
          text: 'No hay regalos',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return;
    }else {
      this.vistaSeleccionada = vista;
    }

  }
  seleccionarVistaGrupo(vista: 'manual' | 'automatico') {
    this.vistaSeleccionadaGrupo = vista;

  }

  get juegos() {
    return this.datosServicio.juegos;
  }

 get participantes() {
    return this.datosServicio.participantes;
 }

  get grupos() {
    return this.datosServicio.grupos;
  }


  terminarJuego() {
    //terminar juego
    this.datosServicio.limpiarTodosLosDatos();

  }

  juegoSeleccionados(juego: Juegos) {
    if (this.juegoSeleccionado === juego) {
      this.juegoSeleccionado = null;
      this.datosServicio.limpiarSelecionado(juego);
    } else {
      this.juegoSeleccionado = juego;
      this.datosServicio.juegoseleccionado(juego);
    }
  }

  get regalos() {
    return this.datosServicio.regalos;
  }

  regaloSeleccionados(regalo: Regalo) {
    if (this.regaloSeleccionado === regalo) {
      this.regaloSeleccionado = null;
      this.datosServicio.limpiarSelecionado(regalo);
    } else {
      this.regaloSeleccionado = regalo;
      this.datosServicio.regaloseleccionado(regalo);
    }
  }


  recuperarDatos() {
    this.datosServicio.recuperarDatos();
  }
}
