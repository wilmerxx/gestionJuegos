import { Injectable } from '@angular/core';
import {Participante} from "../modelo/participante";
import {Grupo} from "../modelo/grupo";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private modalVisibleSubject = new BehaviorSubject<boolean>(false);
  modalVisible$: Observable<boolean> = this.modalVisibleSubject.asObservable();

  _participantes: Participante[] = [];

  get participantes() {
    return [...this._participantes];
  }

  _grupos: Grupo[] = [];

  get grupos() {
    return [...this._grupos];
  }


  constructor() { }

  agregarParticipante(nombre: string) {
    this._participantes.push(new Participante(nombre));
  }

  generarGrupos(numero: number) {
    let abecedario = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Limpia los grupos
    this._grupos = [];


    // Genera los grupos
    for (let i = 0; i < numero; i++) {
      let grupo = new Grupo();
      grupo.nombre = abecedario[i];
      this._grupos.push(grupo);
    }

    // Asigna aleatoriamente a cada participante a un grupo
    let participantes = [...this._participantes];
    while (participantes.length > 0) {
      let indice = Math.floor(Math.random() * participantes.length);
      let participante = participantes.splice(indice, 1)[0];
      for (let i = 0; i < this._grupos.length; i++) {
        if (this._grupos[i].participantes.length < this._participantes.length / this._grupos.length) {
          this._grupos[i].participantes.push(participante);
          break;
        }
      }
    }
  }

  ganar(nombre: string) {
    // buscar el participante
    let indice = -1;
    for (let i = 0; i < this.grupos.length; i++) {
      if (this.grupos[i].nombre === nombre) {
        indice = i;
        break;
      }
    }

    // sumar puntaje al grupo con un valor aleatorio entre 1 y 100
    this._grupos[indice].puntaje += Math.floor(Math.random() * 100) + 1;
  }

  //eliminar participante
  eliminarParticipante(nombre: string){
    let indice = -1;
    for (let i = 0; i < this.participantes.length; i++) {
      if (this.participantes[i].nombre === nombre) {
        indice = i;
        break;
      }
    }
    this._participantes.splice(indice, 1);
  }

  ganarParticipante(nombre: string) {
    // buscar el participante
    let indice = -1;
    for (let i = 0; i < this.participantes.length; i++) {
      if (this.participantes[i].nombre === nombre) {
        indice = i;
        break;
      }
    }

    // sumar puntaje al grupo con un valor aleatorio entre 1 y 100
    this._participantes[indice].puntaje += Math.floor(Math.random() * 100) + 1;
  }

  limpiarTodosLosDatos() {
    this._participantes.forEach(participante => {
      participante.puntaje = 0;
    });
    this._grupos = [];
  }



  show(): void {
    this.modalVisibleSubject.next(true);
  }

  hide(): void {
    this.modalVisibleSubject.next(false);
  }

}
