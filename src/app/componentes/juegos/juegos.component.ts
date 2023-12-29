import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {Juegos} from "../../modelo/juegos";
import {DatosService} from "../../servicio/datos.service";

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  constructor(private datosServicio: DatosService) { }
  puntos: number = 0;
  get juegos() {
    return this.datosServicio.juegos;
  }


  ngOnInit(): void {
  }

  //agregar juegos
  nombreJuego: string = '';
  agregarJuego() {
    if (this.nombreJuego == '') {
      swal.fire({
        title: 'Error!',
        text: 'Debe ingresar un nombre',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    //debe ingresar los puntos
    if (this.puntos == 0) {
      swal.fire({
        title: 'Error!',
        text: 'Debe ingresar los puntos',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    //si el nombre solo tiene espacios en blanco
    if (!this.nombreJuego.trim()) {
      swal.fire({
        title: 'Error!',
        text: 'Debe ingresar un nombre',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    //el primera letra en mayuscula
    this.nombreJuego = this.nombreJuego.charAt(0).toUpperCase() + this.nombreJuego.slice(1);
    //si el nombre ya existe
    for (let i = 0; i < this.juegos.length; i++) {
      if (this.nombreJuego == this.juegos[i].nombre) {
        swal.fire({
          title: 'Error!',
          text: 'El nombre ya existe',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return;
      }
    }

    let juego = new Juegos();
    juego.nombre = this.nombreJuego;
    juego.puntos = this.puntos;
    this.datosServicio.agregarJuego(juego);
    this.nombreJuego = '';
    this.puntos = 0;
  }

  eliminarJuego(nombre: string) {
    swal.fire({
      title: 'Eliminar',
      text: '¿Está seguro que desea eliminar el juego?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.datosServicio.eliminarJuego(nombre);
        swal.fire(
          'Eliminado!',
          'El juego ha sido eliminado',
          'success'
        );
      }
    });
  }
}
