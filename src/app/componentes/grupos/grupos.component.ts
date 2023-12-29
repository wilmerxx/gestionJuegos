import { Component, OnInit } from '@angular/core';
import {Grupo} from "../../modelo/grupo";
import swal from "sweetalert2";

import {DatosService} from "../../servicio/datos.service";

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  cantidad: number = 0;

  get participantes() {
    return [...this.datosServicio.participantes];
  }

  get gruposGenerados() {
    return [...this.datosServicio.grupos];
  }

  constructor(private datosServicio: DatosService) { }

  ngOnInit(): void {

  }

  generarGrupos() {
    // Verifica que haya participantes
    if (this.participantes.length === 0) {
      swal.fire({
        title: 'Error',
        text: 'No hay participantes',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    // Asigna aleatoriamente a cada participante a un grupo
    this.datosServicio.generarGrupos(this.cantidad);
  }

  ganar( grupo: any) {
    this.datosServicio.ganarGrupo(grupo.nombre);
    this.guardarGanadorGrupo(grupo);
  }

  get grupos() {
    return this.datosServicio.grupos;
  }
  get regalos() {
    return this.datosServicio.regalos;
  }
  get juegos() {
    return this.datosServicio.juegos;
  }

  //guardar ganado del grupo
  guardarGanadorGrupo(grupo: any) {

    //buscar regalo seleccionado
    let indiceRegalo = -1;
    for (let i = 0; i < this.regalos.length; i++) {
      if (this.regalos[i].regaloseleccionado === true) {
        indiceRegalo = i;
        break;
      }
    }
    //buscar juego seleccionado
    let indiceJuego = -1;
    for (let i = 0; i < this.juegos.length; i++) {
      if (this.juegos[i].juegoseleccionado === true) {
        indiceJuego = i;
        break;
      }
    }
    //buscar grupo
    let indice = -1;
    for (let i = 0; i < this.grupos.length; i++) {
      if (this.grupos[i].nombre === grupo.nombre) {
        indice = i;
        break;
      }
    }
    //guardar ganador
    let ganadorGrupo= {
      grupo: this.grupos[indice].nombre,
      puntaje: this.juegos[indiceJuego].puntos,
      regalo: this.regalos[indiceRegalo].nombre,
      juego: this.juegos[indiceJuego].nombre,
      participantes: this.grupos[indice].participantes
    }
    this.datosServicio.guardarGanadorGrupo(ganadorGrupo);
  }

  reiniciarPuntajeGrupo() {
    this.datosServicio.reiniciarPuntajeGrupo();
  }
}



