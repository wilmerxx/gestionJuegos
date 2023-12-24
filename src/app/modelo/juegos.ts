export class Juegos {
  nombre: string;
  juegos: Juegos[] = [];
  constructor() {
    this.nombre = '';
  }
  getJuegos() {
    return this.juegos;
  }

  setJuegos(juego: Juegos) {
    this.juegos.push(juego);
  }
}
