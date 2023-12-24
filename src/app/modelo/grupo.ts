import {Participante} from "./participante";

export class Grupo {

    nombre:string;
    participantes:Participante[];
    puntaje:number;

    constructor() {
        this.nombre = "";
        this.puntaje = 0;
        this.participantes = [];
    }

}
