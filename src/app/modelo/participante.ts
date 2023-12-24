export class Participante {

    nombre: string;
    participantes: Participante[] = [];
    puntaje: number = 0;

    constructor( nombre: string) {
        this.nombre = nombre;

    }

    getParticipantes() {
        return this.participantes;
    }

    setParticipantes(participante: Participante) {
        this.participantes.push(participante);
    }

    getNombre() {
        return this.nombre;
    }

    setNombre(nombre: string) {
        this.nombre = nombre;
    }
}
