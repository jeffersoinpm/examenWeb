import {Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res} from "@nestjs/common";
import {Equipo_futbolService,Equipo_Futbol} from "./equipo_futbol.service";
import {Equipo_futbolPipe} from "../pipes/equipo_futbol.pipe";
import {EQUIPO_FUTBOL_SCHEMA} from "./equipo_futbol.schema";


@Controller('Equipo_Futbol')
export  class Equipo_futbolController {

    constructor(private  equipo_futbolService: Equipo_futbolService){

    }
    //Body params
    @Post() //uso pipe
    crearEquipoFutbol(@Body(new Equipo_futbolPipe(EQUIPO_FUTBOL_SCHEMA)) bodyParams) {
            const equipo_futbol = new Equipo_Futbol(
                bodyParams.nombre,
                bodyParams.liga,
                bodyParams.fechaCreacion,
                bodyParams.numeroCopasInternacionales,
                bodyParams.campeonActual,
            );
            return this.equipo_futbolService.crearEquipoDeFutbol(equipo_futbol);
    }

    @Get()
    listarTodosLosEquiposDeFutbol(@Res () response, @Req () request){
        var arregloEquiposDeFutbol = this.equipo_futbolService.listarEquipoDeFutbol();
        if(Object.keys(arregloEquiposDeFutbol).length === 0){
            return response.send({
                mensaje:'No existe ningun equipo_futbol',
                estado: HttpStatus.NOT_FOUND + ' Not found',
            });
        } else{
            return response.status(202).send(arregloEquiposDeFutbol);
        }
    }


    @Get('/:id')
    mostrarEquipoFutbol(@Res () response, @Req () request, @Param() params){

        let arregloEquiposDeFutbol = this.equipo_futbolService.obtenerUno(params.id);
        if(arregloEquiposDeFutbol){
            return response.send(arregloEquiposDeFutbol);
        } else{
            console.log('no encontrado');
            return response.status(400).send({
                mensaje:'Equipo_Futbol no encontrado',
                estado:HttpStatus.NOT_FOUND + ' Not found',
                URL:request.originalUrl,
            });
        }

    }

    @Put('/:id') //Uso pipe
    modificarEquipoDeFutbol(@Res () response, @Req () request, @Param() params, @Body(new Equipo_futbolPipe(EQUIPO_FUTBOL_SCHEMA)) body){
        let arregloEquipoDeFutbol = this.equipo_futbolService.obtenerUno(params.id);
        if(arregloEquipoDeFutbol) {
            return response.send(
                this.equipo_futbolService.editarUno(
                    params.id,
                    body.nombre,
                    body.liga,
                    body.fechaCreacion,
                    body.numeroCopasInternacionales,
                    body.campeonActual
                ));
        } else{
            return response.send({
                mensaje:'Equipo_Futbol no encontrado. No se puede modificar',
                estado:HttpStatus.NOT_FOUND + ' Not found',
                url:request.path,
               //headers: request.headers,
            });
        }
    }
}

