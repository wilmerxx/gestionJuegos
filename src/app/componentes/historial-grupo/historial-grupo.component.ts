import { Component, OnInit } from '@angular/core';
import {DatosService} from "../../servicio/datos.service";

@Component({
  selector: 'app-historial-grupo',
  templateUrl: './historial-grupo.component.html',
  styleUrls: ['./historial-grupo.component.css']
})
export class HistorialGrupoComponent implements OnInit {

  constructor(private datosServicio: DatosService) { }

  get ganadoresGrupo() {
    return this.datosServicio.ganadoresGrupo;
  }
  ngOnInit(): void {
  }

}
