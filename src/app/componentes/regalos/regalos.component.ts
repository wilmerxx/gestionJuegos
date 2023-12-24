import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
@Component({
  selector: 'app-regalos',
  templateUrl: './regalos.component.html',
  styleUrls: ['./regalos.component.css']
})
export class RegalosComponent implements OnInit {

  constructor() { }
  nombreRegalo: string = '';
  regalos: string[] = [];

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
    for (let i = 0; i < this.regalos.length; i++) {
      if (this.nombreRegalo == this.regalos[i]) {
        swal.fire({
          title: 'Error!',
          text: 'El nombre ya existe',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return;
      }
    }
this.regalos.push(this.nombreRegalo);
this.nombreRegalo = '';
  }

}
