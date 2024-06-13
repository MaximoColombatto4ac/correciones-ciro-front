import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.server';
import { HttpClient } from '@angular/common/http';
import { NgComponentOutlet } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tenista } from '../tenista/tenista';

@Component({
  selector: 'app-modificar-tenista',
  standalone: true,
  imports: [CommonModule, NgFor, NgComponentOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './modificar-tenista.component.html',
  styleUrls: ['./modificar-tenista.component.css']
})
export class ModificarTenistaComponent implements OnInit {
  jsonData: any;
  apiservice: ApiService = new ApiService(this.http);
  id!: string;
  tenistaForm: FormGroup;
  tenista!: Tenista;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.tenistaForm = this.formBuilder.group({
      _id: '',
      nombre: '',
      peso: 0,
      altura: 0,
      edad: 0,
      perfilATP: '',
      pais: '',
      titulos: 0
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getTenista(this.id);
    });
  }

  modificar() {
    console.log("Modificando tenista");
    this.tenista = this.tenistaForm.value;
    this.apiservice.modificarTenista(this.tenista).subscribe(data => {
      console.log(data);
    });
  }

  getTenista(id: string) {
    this.apiservice.getTenista(id).subscribe((data: Tenista) => {
      this.jsonData = data;
      console.log(this.jsonData);
      this.tenistaForm.patchValue({
        _id: this.jsonData._id,
        nombre: this.jsonData.nombre,
        peso: this.jsonData.peso,
        altura: this.jsonData.altura,
        edad: this.jsonData.edad,
        perfilATP: this.jsonData.perfilATP,
        pais: this.jsonData.pais,
        titulos: this.jsonData.titulos
      });
    });
  }
}
