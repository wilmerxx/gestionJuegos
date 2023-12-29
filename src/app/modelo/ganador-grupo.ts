import {Participante} from "./participante";

export class GanadorGrupo {

    grupo: string;
    puntaje: number;
    regalo: string;
    juego: string;
    participantes: Participante[];

    constructor() {
        this.grupo = "";
        this.puntaje = 0;
        this.regalo = "";
        this.juego = "";
        this.participantes = [];
    }

}
