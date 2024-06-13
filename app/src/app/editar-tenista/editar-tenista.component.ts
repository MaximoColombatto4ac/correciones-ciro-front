import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Tenista } from '../tenista/tenista';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.server';
import { Titulo } from '../tenista/titulo';
import { error } from 'node:console';

type TipoRecord= Record<Titulo, number> | null;
@Component({
  selector: 'app-editar-tenista',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './editar-tenista.component.html',
  styleUrl: './editar-tenista.component.css'
})
export class EditarTenistaComponent {
  jsonData: any;
  tenista!: Tenista;
  tenistaForm: FormGroup;
  apiserivce: ApiService = new ApiService(this.http);
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    
    this.tenistaForm = this.formBuilder.group({
      nombre: '',
      peso:  Number(''),
      altura:  Number(''),
      edad:  Number(''),
      perfilATP: '',
      pais: '',
      titulos: Number('')
    });
  }
  onSubmit(){
    console.log("Subiendo tenista");
    this.tenista = {
      _id: '',
      nombre: this.tenistaForm.value.nombre,
      peso: this.tenistaForm.value.peso,
      altura: this.tenistaForm.value.altura,
      edad: this.tenistaForm.value.edad,
      perfilATP: this.tenistaForm.value.perfilATP,
      pais: this.tenistaForm.value.pais,
      titulos: this.tenistaForm.value.titulos,
    }
    this.apiserivce.addTenista(this.tenista).subscribe(data => {
      console.log(data);
    });
  }
  
}
