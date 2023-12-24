import { Component, OnInit } from '@angular/core';
import {Participante} from "../../modelo/participante";
import swal from 'sweetalert2';
import {DatosService} from "../../servicio/datos.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private datosServicio: DatosService) { }
  nombreParticipante: string = '';

  get participantes() {
    return [...this.datosServicio.participantes];
  }
  ngOnInit() {

  }


}
