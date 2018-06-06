import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {PeticionIncorrectaException} from "../exceptions/peticion-incorrecta.exception";
import * as Joi from 'joi';
@Injectable()
export class Equipo_futbolPipe implements PipeTransform{
    constructor (private readonly _schema){
    }

    transform(jsonValidarJugador: any, metadata: ArgumentMetadata){
        const  {error}= Joi.validate(jsonValidarJugador, this._schema);
        if(error){
            throw  new PeticionIncorrectaException(
                {
                    erorr: error,
                    mensaje: 'Json de Equipo_Futbol no valido',
                },
                10
            )
        }else{
            return jsonValidarJugador;
        }

    }
}