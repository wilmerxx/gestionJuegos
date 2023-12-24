import { Component, OnInit } from '@angular/core';
import { Participante } from 'src/app/modelo/participante';
import { DatosService } from 'src/app/servicio/datos.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.css']
})
export class ParticipantesComponent implements OnInit {

  constructor(private datosServicio: DatosService) { }

  nombreParticipante: string = '';

  get participantes() {
    return [...this.datosServicio.participantes];
  }

  ngOnInit(): void {

  }

  agregarParticipante() {
    if (this.nombreParticipante == '') {
      swal.fire({
        title: 'Error!',
        text: 'Debe ingresar un nombre',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    //si el nombre solo tiene espacios en blanco
    if (!this.nombreParticipante.trim()) {
      swal.fire({
        title: 'Error!',
        text: 'Debe ingresar un nombre',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    //el primera letra en mayuscula
    this.nombreParticipante = this.nombreParticipante.charAt(0).toUpperCase() + this.nombreParticipante.slice(1);
    //si el nombre ya existe
    for (let i = 0; i < this.datosServicio._participantes.length; i++) {
      if (this.nombreParticipante == this.datosServicio.participantes[i].nombre) {
        swal.fire({
          title: 'Error!',
          text: 'El nombre ya existe',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return;
      }
    }


    this.datosServicio.agregarParticipante(this.nombreParticipante);
    this.nombreParticipante = '';
  }

  eliminarParticipante(nombre: string) {
    this.datosServicio.eliminarParticipante(nombre);
  }

}
