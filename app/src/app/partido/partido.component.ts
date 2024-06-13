import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.server';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { Tenista } from '../tenista/tenista';
@Component({
  selector: 'app-partido',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './partido.component.html',
  styleUrl: './partido.component.css'
})
export class PartidoComponent {
modificar(arg0: any) {
throw new Error('Method not implemented.');
}
  jsonData: any;
  apiservice: ApiService= new ApiService(this.http);
  id!: number
  jugador1!: Tenista;
  jugador2!: Tenista;
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe(params=>{
      this.id=params['id']
      this.getPartido(this.id);
    }) }
  getPartido(id: any){
    this.apiservice.getPartido(id).subscribe((data: any) =>{
      this.jsonData=data;
      this.apiservice.getTenista(this.jsonData.jugador1).subscribe((data: any) =>{
        this.jugador1 = data;
      })
      this.apiservice.getTenista(this.jsonData.jugador2).subscribe((data: any) =>{
        this.jugador2 = data;
      })
      
      console.log(this.jsonData)
    });
  }
  eliminarPartido(id: any){
    console.log("Eliminando Partido")
    this.apiservice.eliminarPartido(id).subscribe(data=>{
      console.log(data);
      this.router.navigate(['/buscarPartido'])
    });
  }
  modificarPartido(id: any){
    console.log("Modificando Partido")
    this.router.navigate(['/modificarPartido/'+id])
  }
}
