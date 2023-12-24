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

  ganar(nombre: string) {
    this.datoServicio.ganarParticipante(nombre);
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
}
