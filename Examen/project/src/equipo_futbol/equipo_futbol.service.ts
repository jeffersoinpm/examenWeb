import {Component} from "@nestjs/common";

@Component()

export class Equipo_futbolService {

    //Metodo Crear equipo_futbol
    equiposDeFutbol: Equipo_Futbol[] = [];
    crearEquipoDeFutbol(equipoDeFutbol: Equipo_Futbol): Equipo_Futbol[]{
        this.equiposDeFutbol.push(equipoDeFutbol);
        return this.equiposDeFutbol;
    }

    //Metodo Listar Todos los equipos de futbol
    listarEquipoDeFutbol(){
        return this.equiposDeFutbol;
    }
    //Metodo obtener un equipo_futbol
    obtenerUno(equipoDeFutbolId){
        console.log(this.equiposDeFutbol[equipoDeFutbolId]);
        return this.equiposDeFutbol[equipoDeFutbolId];
    }
    //Metodo editar un equipo_futbol
    editarUno(idEquipoDeFutbol, nombre, liga, fechaCreacion, numeroCopasInternacionales, campeonActual){
        let equipofutbolActualizado = this.obtenerUno(idEquipoDeFutbol);

        equipofutbolActualizado.nombre = nombre;
        equipofutbolActualizado.liga = liga;
        equipofutbolActualizado.fechaCreacion = fechaCreacion;
        equipofutbolActualizado.numeroCopasInternacionales = numeroCopasInternacionales;
        equipofutbolActualizado.campeonActual = campeonActual;

        return equipofutbolActualizado;
    }
}


export class Equipo_Futbol {

    constructor(
        public nombre:string,
        public liga:string,
        public fechaCreacion:string,
        public numeroCopasInternacionales:number,
        public campeonActual:boolean,
    ){};

}