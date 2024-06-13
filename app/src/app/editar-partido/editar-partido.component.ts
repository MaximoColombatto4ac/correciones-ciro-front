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
    // Generar los sets
    const sets: SetTenis[] = [];
    for (let i = 1; i <= 5; i++) {
      const set: SetTenis = {
        jugador1Puntaje: Number(this.partidoForm.get('ResJ1Set' + i)?.value),
        jugador2Puntaje: Number(this.partidoForm.get('ResJ2Set' + i)?.value)
      };
      sets.push(set);
    }
    const id1 = this.partidoForm.get('id1')?.value;
    const id2 = this.partidoForm.get('id2')?.value;
    const id3 = this.partidoForm.get('id3')?.value;

    this.partido = {
      _id: "",
      jugador1: id1,
      jugador2: id2,
      ganador: id3,
      sets: sets
    };

    this.apiserivce.addPartido(this.partido).subscribe(data => {
      console.log(data);
    });
  }
}
