import {Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res} from "@nestjs/common";
import {Jugador, JugadorService} from "./jugador.service";
import {JugadorPipe} from "../pipes/jugador.pipe";
import {JUGADOR_SCHEMA} from "./jugador.schema";

@Controller('Jugador')
export class JugadorController {

    constructor(private  jugadorService: JugadorService) {

    }

    //Body params
    @Post()
    crearJugador(@Body(new JugadorPipe(JUGADOR_SCHEMA)) bodyParams) {
        const jugador1 = new Jugador(
            bodyParams.numeroCamiseta,
            bodyParams.nombreCamiseta,
            bodyParams.nombreCompletoJugador,
            bodyParams.poderEspecialDos,
            bodyParams.fechaIngresoEquipo,
            bodyParams.goles,
            bodyParams.equipoFutbolId,
        );
        return this.jugadorService.crearJugador(jugador1);

    }

    @Get()
    listarTodosLosJugadores(@Res() response, @Req() request) {
        var arregloJugadores = this.jugadorService.listarJugadores();
        if (Object.keys(arregloJugadores).length === 0) {
            return response.send({
                mensaje: 'No existe ningun jugador',
                estado: HttpStatus.NOT_FOUND + ' Not found',
            });
        } else {
            return response.status(202).send(arregloJugadores);
        }
        //return response.status(202).send(this.jugadorService.listarJugadores());
    }

    @Get('/:id')
    mostrarUnJugador(@Res() response, @Req() request, @Param() params) {
        let arregloJugador = this.jugadorService.obtenerUno(params.id);
        if (arregloJugador) {
            return response.send(arregloJugador);
        } else {
            console.log('no encontrado');
            return response.status(400).send({
                mensaje: 'Jugador no encontrado',
                estado: HttpStatus.NOT_FOUND + ' Not found',
                URL: request.originalUrl,
            });
        }
    }

    @Put('/:id')
    modificarJugador(@Res() response, @Req() request, @Param() params, @Body(new JugadorPipe(JUGADOR_SCHEMA)) body) {
        let arregloJugadores = this.jugadorService.obtenerUno(params.id);
        if (arregloJugadores) {
            return response.send(
                this.jugadorService.editarUno(
                    params.id,
                    body.numeroCamiseta,
                    body.nombreCamiseta,
                    body.nombreCompletoJugador,
                    body.poderEspecialDos,
                    body.fechaIngresoEquipo,
                    body.goles,
                    body.equipoFutbolId,
                ));
        } else {
            return response.send({
                mensaje: 'Jugador no encontrado. No se puede modificar',
                estado: HttpStatus.NOT_FOUND + ' Not found',
                url: request.path,
            });
        }
    }
}