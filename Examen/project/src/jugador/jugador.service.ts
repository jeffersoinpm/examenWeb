import {Component} from "@nestjs/common";

@Component()
export class JugadorService {

    //Metodo Crear Jugador
    jugadores: Jugador[] = [];

    crearJugador(jugador: Jugador): Jugador[] {
        this.jugadores.push(jugador);
        return this.jugadores;
    }

    //Metodo Listar Todos los jugadores
    listarJugadores() {
        return this.jugadores;
    }

    //Metodo obtener un jugador
    obtenerUno(jugadorID) {
        console.log(this.jugadores[jugadorID]);
        return this.jugadores[jugadorID];
    }

    //Metodo editar un jugador
    editarUno(jugadorId, numeroCamiseta, nombreCamiseta, nombreCompletoJugador, poderEspecialDos, fechaIngresoEquipo, goles, equipoFutbolId) {
        let jugadorActualizado = this.obtenerUno(jugadorId);
        jugadorActualizado.numeroCamiseta = numeroCamiseta;
        jugadorActualizado.nombreCamiseta = nombreCamiseta;
        jugadorActualizado.nombreCompletoJugador = nombreCompletoJugador;
        jugadorActualizado.poderEspecialDos = poderEspecialDos;
        jugadorActualizado.fechaIngresoEquipo = fechaIngresoEquipo;
        jugadorActualizado.goles = goles;
        jugadorActualizado.equipoFutbolId = equipoFutbolId;
        return jugadorActualizado;
    }

}


export class Jugador {
    constructor(
        public numeroCamiseta: number,
        public nombreCamiseta: string,
        public nombreCompletoJugador: string,
        public poderEspecialDos: string,
        public fechaIngresoEquipo: string,
        public goles: number,
        public equipoFutbolId: number,
    ) {
    };
}