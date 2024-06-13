import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Partido } from '../partido/Partido';
import { ApiService } from '../api.server';
import { HttpClient } from '@angular/common/http';
import { Tenista } from '../tenista/tenista';
import { Titulo } from '../tenista/titulo';
import { Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SetTenis } from '../partido/Sets';

@Component({
  selector: 'app-editar-partido',
  standalone: true,
  imports: [NavBarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-partido.component.html',
  styleUrl: './editar-partido.component.css'
})
export class EditarPartidoComponent {
  jsonData: any;
  partido!: Partido
  partidoForm: FormGroup;
  apiserivce: ApiService = new ApiService(this.http);
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    
    this.partidoForm = this.formBuilder.group({
      id1: Number(''),
      id2: Number(''),
      id3: Number(''),
      ResJ1Set1: Number(''),
      ResJ2Set1: Number(''),
      ResJ1Set2: Number(''),
      ResJ2Set2: Number(''),
      ResJ1Set3: Number(''),
      ResJ2Set3: Number(''),
      ResJ1Set4: Number(''),
      ResJ2Set4: Number(''),
      ResJ1Set5: Number(''),
      ResJ2Set5: Number('')
    });
  }
  async onSubmit(){
    console.log("Subiendo partido");
    this.apiserivce.addPartido(this.partido).subscribe(data => {
      console.log(data);
    });
  }
  generarSets(): any{
    let sets: SetTenis[] = [];
    for (let i = 1; i <= 5; i++) {
      let aux!: SetTenis;
      aux.jugador1Puntaje = this.partidoForm.get('ResJ1Set' + i)?.value;
      aux.jugador2Puntaje = this.partidoForm.get('ResJ2Set' + i)?.value;
      sets.push(aux);
    }
    return sets
  }
}
