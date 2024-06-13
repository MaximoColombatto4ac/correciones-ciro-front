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
  partidoList: any
  resultados: any
  id: number;
  idParametro: number;
  apiservice: ApiService= new ApiService(this.http);
  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute){
    this.idParametro = 0;
    this.id = 0;
  }
  ngOnInit(): void {
    this.mostrarTodos();
  }
  mostrarTodos(){
    console.log("Mostrando todos los partidos");
    this.apiservice.getPartidos().subscribe((data: any)=>{
      console.log(data);
      this.partidoList = data;
      this.resultados = this.partidoList;
    });
  }
}
