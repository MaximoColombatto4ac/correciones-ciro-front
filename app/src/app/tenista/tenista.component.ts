import { Component, Inject, InjectorType, Input, NgModule, OnInit, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../api.server';
import { HttpClient } from '@angular/common/http';
import { NgComponentOutlet } from '@angular/common';


@Component({
  selector: 'app-tenista',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, NgComponentOutlet, RouterLink],
  templateUrl: './tenista.component.html',
  styleUrl: './tenista.component.css'
})
export class TenistaComponent {
  
  jsonData: any;
  partidos: any[] = [] // agregi un array partidos
  jugadorNombres: Map<string, { jugador1: string, jugador2: string }> = new Map(); // almacena llave (id del partido) y valor (nombre de los jugadores)
  apiservice: ApiService= new ApiService(this.http);
  id!: string
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute){ 
    
    this.route.params.subscribe(params=>{
      this.id = params['id']
      this.getTenista(this.id);
    })
    this.getPartidosTenista(this.id);  // llamo a esta funcion que trae los partidos del tenista
  }
  modificar(id: any){
    console.log("Modificando Tenista")
    this.router.navigate(['/modificarTenista', id])
  }
  eliminarTenista(id: any){
    console.log("Eliminando Tenista")
    this.apiservice.eliminarTenista(id).subscribe(data=>{
      console.log(data);
      this.router.navigate(['/buscarTenista'])
    });
  }
  getTenista(id: string){
    this.apiservice.getTenista(id).subscribe((data: any) =>{
      this.jsonData=data;
      console.log(this.jsonData)
    });
  }
  getPartidosTenista(id: string) {
    this.apiservice.getPartidos().subscribe((data: any) => {
      // Obtener todos los partidos y lo asigna al array
      this.partidos = data; 
  
      // Filtrar partidos según el id del jugador actual
      this.partidos = this.partidos.filter((partido: any) =>
        partido.jugador1 === id || partido.jugador2 === id
      );
  
      // Limitar a máximo 5 partidos si hay más
      if (this.partidos.length > 5) {
        this.partidos = this.partidos.slice(0, 5);
      }
  
      console.log(this.partidos); // Mostrar los partidos filtrados y limitados
      this.cargarNombresJugadores(this.partidos)
    });
  }
  cargarNombresJugadores(partidos: any[]): void {
    partidos.forEach(partido => { // recorro uno por uno todos los partidos
      const jugador1Id = partido.jugador1;
      const jugador2Id = partido.jugador2;

      this.apiservice.getTenista(jugador1Id).subscribe((jugador1Name: any) => {
        this.apiservice.getTenista(jugador2Id).subscribe((jugador2Name: any) => {
          this.jugadorNombres.set(partido._id, { jugador1: jugador1Name.nombre, jugador2: jugador2Name.nombre }); // le pongo como llave el id del partido y como valor los jugadores
          console.log(this.jugadorNombres);
          console.log(jugador1Name, jugador2Name);
        });
      });
    });
  } 
  
  getJugadorNombres(partidoId: string): { jugador1: string, jugador2: string } | null { // consigue jugadores
    return this.jugadorNombres.get(partidoId) || null;
  }
}
