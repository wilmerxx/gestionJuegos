import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DatosService } from 'src/app/servicio/datos.service';
import {Grupo} from "../../modelo/grupo";
import {animate, style, transition, trigger} from "@angular/animations";
import {GanadorGrupo} from "../../modelo/ganador-grupo";

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({ opacity: 0, transform: 'translateY(-10px)' }), animate('5000ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))]),
      transition(':leave', [style({ opacity: 1, transform: 'translateY(0)' }), animate('5000ms ease-out', style({ opacity: 0, transform: 'translateY(-10px)' }))]),
    ]),
  ],
})
export class ResultadosComponent implements OnInit {
  @ViewChild('modalResulatdos') exampleModal!: ElementRef;
  constructor(private datosServicio: DatosService) { }

  get grupos() {
    return this.datosServicio.grupos;
  }

  grupoGanadores: Grupo []=[];

  ngOnInit(): void {

  }

  //ordenar grupos por puntaje
  get ordenarGrupos() {
    return this.grupoGanadores = this.grupos.sort((a , b) => {
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


  openModal() {
    if (this.exampleModal) {
      const modalElement = this.exampleModal.nativeElement;
      modalElement.classList.add('show');
      modalElement.style.display = 'block';  // Asegúrate de que el modal se muestre
    }
  }

  hideModal() {
    if (this.exampleModal) {
      const modalElement = this.exampleModal.nativeElement;
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';  // Asegúrate de que el modal se oculte
    }
  }

}
