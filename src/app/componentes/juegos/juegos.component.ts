import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {Juegos} from "../../modelo/juegos";
@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  constructor() { }



  ngOnInit(): void {
  }

  //agregar juegos
  nombreJuego: string = '';
  juegos: string[] = [];
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
      if (this.nombreJuego == this.juegos[i]) {
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
    this.juegos.push(juego.nombre);
    this.nombreJuego = '';
  }

}
