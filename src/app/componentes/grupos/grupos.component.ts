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

  grupos: Grupo[] = [];
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
    // Asigna aleatoriamente a cada participante a un grupo
    this.datosServicio.generarGrupos(this.cantidad);
  }

  ganar( nombre: string) {
    this.datosServicio.ganar(nombre);
  }
}



