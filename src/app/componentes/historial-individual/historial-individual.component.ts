import { Component, OnInit } from '@angular/core';
import {DatosService} from "../../servicio/datos.service";
@Component({
  selector: 'app-historial-individual',
  templateUrl: './historial-individual.component.html',
  styleUrls: ['./historial-individual.component.css']
})
export class HistorialIndividualComponent implements OnInit {

  constructor(private datosServicio: DatosService) { }
  get ganadores() {
    return this.datosServicio.ganadores;
  }

  ngOnInit(): void {
  }

}
