export class Regalo {

  nombre: string;
  regalos: Regalo[] = [];
  regaloseleccionado: any = null;

    constructor() {
        this.nombre = '';
    }
    getRegalos() {
        return this.regalos;
    }
    setRegalos(regalo: Regalo) {
        this.regalos.push(regalo);
    }

    getRegaloSeleccionado() {
        return this.regaloseleccionado;
    }
    setRegaloSeleccionado(regalo: Regalo) {
        this.regaloseleccionado = regalo;
    }
}
