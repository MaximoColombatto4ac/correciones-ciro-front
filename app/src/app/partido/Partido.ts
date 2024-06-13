import { Tenista } from "../tenista/tenista";
import { SetTenis } from "./Sets";

export interface Partido{
    _id: string;
    jugador1: Tenista;
    jugador2: Tenista;
    ganador: Tenista;
    sets: SetTenis[];
}