export class Juegos {
  nombre: string;
  juegos: Juegos[] = [];
  puntos: number;
  juegoseleccionado: any = null;
  constructor() {
    this.nombre = '';
    this.puntos = 0;
  }
  getJuegos() {
    return this.juegos;
  }

  setJuegos(juego: Juegos) {
    this.juegos.push(juego);
  }
  getPuntos() {
    return this.puntos;
  }
  setPuntos(puntos: number) {
    this.puntos = puntos;
  }
  getJuegoSeleccionado() {
    return this.juegoseleccionado;
  }
  setJuegoSeleccionado(juego: Juegos) {
    this.juegoseleccionado = juego;
  }
}
