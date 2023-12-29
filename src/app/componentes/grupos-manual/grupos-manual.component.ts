import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/servicio/datos.service';
import swal from "sweetalert2";
import {Participante} from "../../modelo/participante";

@Component({
  selector: 'app-grupos-manual',
  templateUrl: './grupos-manual.component.html',
  styleUrls: ['./grupos-manual.component.css']
})
export class GruposManualComponent implements OnInit {

  constructor(private datosServicio: DatosService) { }
  nombre: string = "";

 get participantes() {
    return this.datosServicio.participantes;
 }
  seleccionadoParticipante: Participante[] = [];

 get grupos() {
    return this.datosServicio.grupos;
  }
  get regalos() {
    return this.datosServicio.regalos;
  }
  get juegos() {
    return this.datosServicio.juegos;
  }
  ngOnInit(): void {
  }


  ganar( grupo: any) {
    this.datosServicio.ganarGrupo(grupo.nombre);
    this.guardarGanadorGrupo(grupo);
  }
  seleccionarParticipante(nombre: string) {
    let indice = -1;

    console.log(this.seleccionadoParticipante);
    for (let i = 0; i < this.seleccionadoParticipante.length; i++) {
      if (this.seleccionadoParticipante[i].nombre === nombre) {
        indice = i;
        break;
      }
    }
    const checkboxSeleccionado = document.querySelector("[value='" + nombre + "']") as HTMLInputElement;
   if (checkboxSeleccionado.checked) {
      if (indice === -1) {
        this.seleccionadoParticipante.push(new Participante(nombre));
      }
    }
    else {
      if (indice !== -1) {
        this.seleccionadoParticipante.splice(indice, 1);
      }
    }
  }

  agregarGrupoManualmente() {
    if (this.nombre != "" && this.seleccionadoParticipante.length != 0) {
      //verificar que no exista ese participante en otro grupo
      let particiapnteExiste = '';
      let existe = false;
      for (let i = 0; i < this.grupos.length; i++) {
        for (let j = 0; j < this.grupos[i].participantes.length; j++) {
          for (let k = 0; k < this.seleccionadoParticipante.length; k++) {
            if (this.grupos[i].participantes[j].nombre === this.seleccionadoParticipante[k].nombre) {
              existe = true;
              particiapnteExiste = this.seleccionadoParticipante[k].nombre;
              break;
            }
          }
        }
      }
      if (existe) {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El participante '+ particiapnteExiste +' ya esta en otro grupo',
        });
        return;
      }
      this.datosServicio.agregarGrupoManual(this.nombre, this.seleccionadoParticipante);
      this.nombre = "";
      this.seleccionadoParticipante = [];
      //desactivar los checkbox
      const checkboxes = document.querySelectorAll("input[type='checkbox']");
      for (let i = 0; i < checkboxes.length; i++) {
        (checkboxes[i] as HTMLInputElement).checked = false;
      }
      swal.fire({
        icon: 'success',
        title: 'Agregado',
        text: 'El grupo se ha agregado correctamente',
      });

    } else {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes llenar todos los campos',
      });
    }

  }

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

  eliminarGrupo(grupo: any) {
    this.datosServicio.eliminarGrupo(grupo.nombre);
  }

  reiniciarPuntajeGrupo() {
    this.datosServicio.reiniciarPuntajeGrupo();
  }
}
