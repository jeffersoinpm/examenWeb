import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Equipo_futbolController} from "./equipo_futbol/equipo_futbol.controller";
import {JugadorController} from "./jugador/jugador.controller";
import {AutorizacionController} from "./controladores/autorizacion.controller";
import {Equipo_futbolService} from "./equipo_futbol/equipo_futbol.service";
import {JugadorService} from "./jugador/jugador.service";

@Module({
  imports: [],
  controllers: [AppController, Equipo_futbolController, JugadorController, AutorizacionController],
  providers: [AppService, Equipo_futbolService, JugadorService],
})
export class AppModule {}
