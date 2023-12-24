import {Participante} from "./participante";
import {Regalo} from "./regalo";
import {Juegos} from "./juegos";

export class Puntaje {

    puntaje: number;
    grupo: string;
    participante: Participante[];
    regalos: Regalo[];
    juegos: Juegos[];
    constructor() {
        this.puntaje = 0;
        this.grupo = "";
        this.participante = [];
        this.regalos = [];
        this.juegos = [];
    }
}
