import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { DatosService } from '../../servicio/datos.service';
import {Regalo} from "../../modelo/regalo";
@Component({
  selector: 'app-regalos',
  templateUrl: './regalos.component.html',
  styleUrls: ['./regalos.component.css']
})
export class RegalosComponent implements OnInit {

  constructor(private datosServicio: DatosService) { }
  nombreRegalo: string = '';


  get regalos() {
    return this.datosServicio.regalos;
  }

  ngOnInit(): void {
  }

  agregarRegalos() {
   if (this.nombreRegalo == '') {
     swal.fire({
       title: 'Error!',
       text: 'Debe ingresar un nombre',
       icon: 'error',
       confirmButtonText: 'Ok'
     });
     return;
   }
    //si el nombre solo tiene espacios en blanco
    if (!this.nombreRegalo.trim()) {
      swal.fire({
        title: 'Error!',
        text: 'Debe ingresar un nombre',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    //el primera letra en mayuscula
    this.nombreRegalo = this.nombreRegalo.charAt(0).toUpperCase() + this.nombreRegalo.slice(1);
    //si el nombre ya existe
    for (let i = 0; i < this.datosServicio.regalos.length; i++) {
      if (this.nombreRegalo == this.datosServicio.regalos[i].nombre) {
        swal.fire({
          title: 'Error!',
          text: 'El nombre ya existe',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return;
      }
    }
    let regalo = new Regalo();
    //agregar el nombre al arreglo
    regalo.nombre = this.nombreRegalo;
    this.datosServicio.agregarRegalo(regalo);
    this.nombreRegalo = '';
  }

  eliminarRegalo(regalo: Regalo) {
    swal.fire({
      title: '¿Está seguro?',
      text: 'No se podrá recuperar el regalo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.datosServicio.eliminarRegalo(regalo);
        swal.fire(
          'Eliminado!',
          'El regalo ha sido eliminado',
          'success'
        );
      }
    });

  }
}
