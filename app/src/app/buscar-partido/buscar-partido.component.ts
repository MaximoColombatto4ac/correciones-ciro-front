import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TenistaComponent } from '../tenista/tenista.component';
import { HttpClient} from '@angular/common/http';
import { NgComponentOutlet } from '@angular/common';
import { inject } from '@angular/core';
import { ApiService } from '../api.server';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-partido',
  standalone: true,
  imports: [RouterLink, TenistaComponent, NgComponentOutlet, FormsModule, ReactiveFormsModule, CommonModule, NgFor],
  templateUrl: './buscar-partido.component.html',
  styleUrl: './buscar-partido.component.css'
})
export class BuscarPartidoComponent implements OnInit{
  partidos: any[] = [];
  jugadorNombres: Map<string, { jugador1: string, jugador2: string }> = new Map(); // almacena llave (id del partido) y valor (nombre de los jugadores)
  apiservice: ApiService= new ApiService(this.http);
  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute){
  }
  ngOnInit(): void {
    this.mostrarTodos();
  }
  mostrarTodos(){
    this.apiservice.getPartidos().subscribe((data: any)=>{
      console.log(data);
      this.partidos = data;
      this.cargarNombresJugadores(this.partidos);
    });
  }
  cargarNombresJugadores(partidos: any[]): void { //
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
