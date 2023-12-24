import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from './servicio/datos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'playgroup';

  constructor(private router: Router, private datosServicio: DatosService) { }
  vistaSeleccionada: 'grupo' | 'individual' | 'null' = 'null';
  @Input() ganadores: any[] = [];
  ordenarGrupos: any;
  grupos() {
    this.router.navigate(['grupos']);
  }

  seleccionarVista(vista: 'grupo' | 'individual') {
    this.vistaSeleccionada = vista;
  }

  terminarJuego() {
    //terminar juego
    this.datosServicio.limpiarTodosLosDatos();
  }

 mostrarGanadores() {

 }


  openModal() {
    this.datosServicio.show();
  }
}
