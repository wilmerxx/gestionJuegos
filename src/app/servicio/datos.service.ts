import { Injectable } from '@angular/core';
import {Participante} from "../modelo/participante";
import {Grupo} from "../modelo/grupo";
import {BehaviorSubject, Observable} from "rxjs";
import swal from "sweetalert2";
import {Juegos} from "../modelo/juegos";
import {Regalo} from "../modelo/regalo";
import {Ganador} from "../modelo/ganador";
import {GanadorGrupo} from "../modelo/ganador-grupo";

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor() {
  }

  private modalVisibleSubject = new BehaviorSubject<boolean>(false);
  modalVisible$: Observable<boolean> = this.modalVisibleSubject.asObservable();

  _participantes: Participante[] = [];
  _regalos: Regalo[] = [];
  get regalos() {
    return [...this._regalos];
  }

  get participantes() {
    return [...this._participantes];
  }

  _grupos: Grupo[] = [];

  get grupos() {
    return [...this._grupos];
  }

  _juegos: Juegos[] = [];

  get juegos() {
      return [...this._juegos];
  }

  _ganadores: Ganador[] = [];

  get ganadores() {
    return [...this._ganadores];
  }

  _ganadoresGrupo: GanadorGrupo[] = [];
  get ganadoresGrupo() {
    return [...this._ganadoresGrupo];
  }

  //recuperar datos de localstorage
  recuperarDatos() {
    if (localStorage.getItem('juegos') === null) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay juegos!',
      });
    }
    if (localStorage.getItem('regalos') === null) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay regalos!',
      });
    }
    if (localStorage.getItem('ganadores') === null) {
       swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay ganadores!',
       });
    }
    if (localStorage.getItem('ganadoresGrupo') === null) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay ganadores de grupo!',
      });
    }
    if (localStorage.getItem('grupos') === null) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay grupos!',
      });
    }
    if (localStorage.getItem('participantes') === null) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay participantes!',
      });
    }

    this._juegos = JSON.parse(localStorage.getItem('juegos') || '[]');
    this._regalos = JSON.parse(localStorage.getItem('regalos') || '[]');
    this._ganadores = JSON.parse(localStorage.getItem('ganadores') || '[]');
    this._ganadoresGrupo = JSON.parse(localStorage.getItem('ganadoresGrupo') || '[]');
    this._grupos = JSON.parse(localStorage.getItem('grupos') || '[]');
    this._participantes = JSON.parse(localStorage.getItem('participantes') || '[]');
  }


  agregarParticipante(nombre: string) {
    this._participantes.push(new Participante(nombre));
    localStorage.setItem('participantes', JSON.stringify(this._participantes));
  }

  generarGrupos(numero: number) {
  // Genera el abecedario
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

  ganarGrupo(nombre: string) {
    // buscar el participante
    let indice = -1;
    for (let i = 0; i < this.grupos.length; i++) {
      if (this.grupos[i].nombre === nombre) {
        indice = i;
        break;
      }
    }
    // si selecciono un juego
    let indiceJuego = -1;
    for (let i = 0; i < this.juegos.length; i++) {
      if (this.juegos[i].juegoseleccionado === true) {
        indiceJuego = i;
        break;
      }
    }
    // si selecciono un regalo
    let indiceRegalo = -1;
    for (let i = 0; i < this.regalos.length; i++) {
      if (this.regalos[i].regaloseleccionado === true) {
        indiceRegalo = i;
        break;
      }
    }
    // si no selecciono un juego
    if (indiceJuego === -1) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No ha seleccionado un juego!',
      });
      return;
    }
    // si no selecciono un regalo
    if (indiceRegalo === -1) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No ha seleccionado un regalo!',
      });
      return;
    }
    // sumar puntaje al grupo del puntaje de juego seleccionado
    this._grupos[indice].puntaje += this.juegos[indiceJuego].puntos;
    localStorage.setItem('grupos', JSON.stringify(this._grupos));
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
    localStorage.setItem('participantes', JSON.stringify(this._participantes));
  }

  ganarParticipante(nombre: string) {
    //buscar participante
    let indice = -1;
    for (let i = 0; i < this.participantes.length; i++) {
      if (this.participantes[i].nombre === nombre) {
        indice = i;
        break;
      }
    }
    //buscar el juego seleccionado
    let indiceJuego = -1;
    for (let i = 0; i < this.juegos.length; i++) {
      if (this.juegos[i].juegoseleccionado === true) {
        indiceJuego = i;
        break;
      }
    }

    //si no hay juego seleccionado
    if(indiceJuego === -1){
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No ha seleccionado un juego!',
      });
      return;
    }

    //buscar el regalo seleccionado
    let indiceRegalo = -1;
    for (let i = 0; i < this.regalos.length; i++) {
      if (this.regalos[i].regaloseleccionado === true) {
        indiceRegalo = i;
        break;
      }
    }

    if(indiceRegalo === -1){
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No ha seleccionado un regalo!',
      });
      return;
    }

    //sumar puntaje al participante del juego seleccionado
    this._participantes[indice].puntaje += this.juegos[indiceJuego].puntos;
    localStorage.setItem('participantes', JSON.stringify(this._participantes));
  }

  limpiarTodosLosDatos() {
    swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
       confirmButtonText: 'Si, estoy seguro!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.limpiarDatos();
        swal.fire(
          'Eliminado!',
          'Todos los datos han sido eliminados.',
          'success'
        );
      }
    });
  }



  show(): void {
    this.modalVisibleSubject.next(true);
  }

  hide(): void {
    this.modalVisibleSubject.next(false);
  }

  //agregar juegos
  agregarJuego(juego: Juegos) {
    this._juegos.push(juego);
    localStorage.setItem('juegos', JSON.stringify(this._juegos));
  }

  eliminarJuego(nombre: string) {
    let indice = -1;
    for (let i = 0; i < this.juegos.length; i++) {
      if (this.juegos[i].nombre === nombre) {
        indice = i;
        break;
      }
    }
    this._juegos.splice(indice, 1);
    localStorage.setItem('juegos', JSON.stringify(this._juegos));
  }

  juegoseleccionado(juego: Juegos) {
    let indice = -1;
    for (let i = 0; i < this.juegos.length; i++) {
      if (this.juegos[i].nombre === juego.nombre) {
        indice = i;
        break;
      }
    }
    //limpiar todos los juegos seleccionados
    this._juegos.forEach(juego => {
      juego.juegoseleccionado = false;
    });
    this._juegos[indice].juegoseleccionado = true;
  }
  //--------------------------regalos--------------------------
//agregar regalos
  agregarRegalo(regalo: Regalo) {
    this._regalos.push(regalo);
    localStorage.setItem('regalos', JSON.stringify(this._regalos));
  }

  eliminarRegalo(regalo: Regalo) {
    let indice = -1;
    for (let i = 0; i < this.regalos.length; i++) {
      if (this.regalos[i].nombre === regalo.nombre) {
        indice = i;
        break;
      }
    }
    this._regalos.splice(indice, 1);
     localStorage.setItem('regalos', JSON.stringify(this._regalos));
  }

  regaloseleccionado(regalo: Regalo) {
    let indice = -1;
    for (let i = 0; i < this.regalos.length; i++) {
      if (this.regalos[i].nombre === regalo.nombre) {
        indice = i;
        break;
      }
    }

    this._regalos.forEach(regalo => {
      regalo.regaloseleccionado = false;
    });
    this._regalos[indice].regaloseleccionado = true;
  }

  limpiarSelecionado(objeto: any) {
    if (objeto instanceof Juegos) {
      let indice = -1;
      for (let i = 0; i < this.juegos.length; i++) {
        if (this.juegos[i].nombre === objeto.nombre) {
          indice = i;
          break;
        }
      }
      this._juegos[indice].juegoseleccionado = false;
    }else if (objeto instanceof Regalo) {
      let indice = -1;
      for (let i = 0; i < this.regalos.length; i++) {
        if (this.regalos[i].nombre === objeto.nombre) {
          indice = i;
          break;
        }
      }
      this._regalos[indice].regaloseleccionado = false;
    }

  }


  //guardar los datos en la clase ganador
  guardarGanador(participante: any) {
    this._ganadores.push(participante);
    localStorage.setItem('ganadores', JSON.stringify(this._ganadores));

  }

  guardarGanadorGrupo(grupo: any) {
    this._ganadoresGrupo.push(grupo);
    localStorage.setItem('ganadoresGrupo', JSON.stringify(this._ganadoresGrupo));
  }

  agregarGrupoManual(nombre: string, participantes: Participante[]) {
    let grupo = new Grupo();
    grupo.nombre = nombre;
    grupo.participantes = participantes;
    this._grupos.push(grupo);
    localStorage.setItem('grupos', JSON.stringify(this._grupos));
  }

  eliminarGrupo(nombre: string) {
    let indice = -1;
    for (let i = 0; i < this.grupos.length; i++) {
      if (this.grupos[i].nombre === nombre) {
        indice = i;
        break;
      }
    }
    this._grupos.splice(indice, 1);
    localStorage.setItem('grupos', JSON.stringify(this._grupos));
  }

  reiniciarPuntajeParticipantes() {
    this._participantes.forEach(participante => {
      participante.puntaje = 0;
    });
   localStorage.setItem('participantes', JSON.stringify(this._participantes));
  }

  reiniciarPuntajeGrupo() {
    this._grupos.forEach(grupo => {
      grupo.puntaje = 0;
    });
  }

  private limpiarDatos() {
    this._participantes = [];
    this._grupos = [];
    this._juegos = [];
    this._regalos = [];
    this._ganadores = [];
    this._ganadoresGrupo = [];
    localStorage.clear();
  }
}
