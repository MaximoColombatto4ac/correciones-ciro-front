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
@Component({
  selector: 'app-buscar-tenista',
  standalone: true,
  imports: [RouterLink, TenistaComponent, NgComponentOutlet, FormsModule, ReactiveFormsModule, CommonModule, NgFor],
  templateUrl: './buscar-tenista.component.html',
  styleUrl: './buscar-tenista.component.css'
})
export class BuscarTenistaComponent {
  tenistaList: any[] = []
  resultados: any[] = []
  apiservice: ApiService= new ApiService(this.http);
  constructor (private router: Router, private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute){
    this.mostrarTodos();
  }
  onInit(){
  }
  mostrarTodos(){
    this.apiservice.getTenistas().subscribe((data: any)=>{
      console.log(data);
      this.tenistaList = data;
      this.resultados = data;
    });
  }
  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.resultados = this.tenistaList.filter(tenista =>
      tenista.nombre.toLowerCase().includes(searchTerm)
    );
  }
}
