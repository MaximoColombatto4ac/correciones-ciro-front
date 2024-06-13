import { Tenista } from "../tenista/tenista";
import { SetTenis } from "./Sets";

export interface Partido{
    id: number;
    jugador1: Tenista;
    jugador2: Tenista;
    ganador: Tenista;
    sets: SetTenis[];
}