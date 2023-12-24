export class Regalo {

  nombre: string;
    regalos: Regalo[] = [];

    constructor() {
        this.nombre = '';
    }
    getRegalos() {
        return this.regalos;
    }
    setRegalos(regalo: Regalo) {
        this.regalos.push(regalo);
    }
}
