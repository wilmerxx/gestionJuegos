import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DatosService } from 'src/app/servicio/datos.service';


@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent implements OnInit {
  @ViewChild('modalResulatdos') exampleModal!: ElementRef;
  constructor(private datoServicio: DatosService) { }

  ngOnInit(): void {
  }


  get grupos() {
    return this.datoServicio.grupos;
  }

  get juegos() {
    return this.datoServicio.juegos;
  }
  get regalos() {
    return this.datoServicio.regalos;
  }
  get participantes() {
    return [...this.datoServicio.participantes];
  }

  //ordenar participantes por puntaje
  get ordenarParticipantes() {
    return this.participantes.sort((a, b) => {
      if (a.puntaje > b.puntaje) {
        return -1;
      }
      if (a.puntaje < b.puntaje) {
        return 1;
      }
      return 0;
    }
    );
  }

  ganar(participante: any) {
    this.datoServicio.ganarParticipante(participante.nombre);
    this.agregarGanador(participante);
  }

  agregarGanador(participante: any) {
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
    //buscar participante
    let indice = -1;
    for (let i = 0; i < this.participantes.length; i++) {
      if (this.participantes[i].nombre === participante.nombre) {
        indice = i;
        break;
      }
    }
    //guardar los datos en la clase ganador
    let ganador = {
      nombre: participante.nombre,
      puntaje: this.juegos[indiceJuego].puntos,
      regalo: this.regalos[indiceRegalo].nombre,
      juego: this.juegos[indiceJuego].nombre
    }
    this.datoServicio.guardarGanador(ganador);
  }


  hideModal() {
    if (this.exampleModal) {
      const modalElement = this.exampleModal.nativeElement;
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';  // Asegúrate de que el modal se oculte
    }
  }

  openModal() {
    if (this.exampleModal) {
      const modalElement = this.exampleModal.nativeElement;
      modalElement.classList.add('show');
      modalElement.style.display = 'block';  // Asegúrate de que el modal se muestre
    }

  }

  reiniciarPuntajeParticipantes() {
    this.datoServicio.reiniciarPuntajeParticipantes();
  }
}
