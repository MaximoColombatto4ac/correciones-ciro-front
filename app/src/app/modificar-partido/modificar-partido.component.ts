import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.server';
import { HttpClient } from '@angular/common/http';
import { NgComponentOutlet } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Partido } from '../partido/Partido';
import { SetTenis } from '../partido/Sets';
import { Tenista } from '../tenista/tenista';

@Component({
  selector: 'app-modificar-partido',
  standalone: true,
  imports: [CommonModule, NgFor, NgComponentOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './modificar-partido.component.html',
  styleUrls: ['./modificar-partido.component.css']
})
export class ModificarPartidoComponent implements OnInit {
  jsonData: any;
  partido!: Partido;
  partidoForm: FormGroup;
  apiservice: ApiService = new ApiService(this.http);
  id!: string;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.partidoForm = this.formBuilder.group({
      jugador1: '',
      jugador2: '',
      ganador: '',
      ResJ1Set1: 0,
      ResJ2Set1: 0,
      ResJ1Set2: 0,
      ResJ2Set2: 0,
      ResJ1Set3: 0,
      ResJ2Set3: 0,
      ResJ1Set4: 0,
      ResJ2Set4: 0,
      ResJ1Set5: 0,
      ResJ2Set5: 0
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getPartido(this.id);
    });
  }

  getPartido(id: string) {
    this.apiservice.getPartido(id).subscribe((data: Partido) => {
      this.jsonData = data;
      console.log(this.jsonData);
      this.partidoForm.patchValue({
        jugador1: this.jsonData?.jugador1,
        jugador2: this.jsonData?.jugador2,
        ganador: this.jsonData.ganador,
        ResJ1Set1: this.jsonData.sets[0]?.jugador1Puntaje,
        ResJ2Set1: this.jsonData.sets[0]?.jugador2Puntaje,
        ResJ1Set2: this.jsonData.sets[1]?.jugador1Puntaje,
        ResJ2Set2: this.jsonData.sets[1]?.jugador2Puntaje,
        ResJ1Set3: this.jsonData.sets[2]?.jugador1Puntaje,
        ResJ2Set3: this.jsonData.sets[2]?.jugador2Puntaje,
        ResJ1Set4: this.jsonData.sets[3]?.jugador1Puntaje,
        ResJ2Set4: this.jsonData.sets[3]?.jugador2Puntaje,
        ResJ1Set5: this.jsonData.sets[4]?.jugador1Puntaje,
        ResJ2Set5: this.jsonData.sets[4]?.jugador2Puntaje
      });
    });
  }

  modificar() {
    console.log("Modificando partido");
    const sets: SetTenis[] = [];
    for (let i = 1; i <= 5; i++) {
      const set: SetTenis = {
        jugador1Puntaje: Number(this.partidoForm.get('ResJ1Set' + i)?.value),
        jugador2Puntaje: Number(this.partidoForm.get('ResJ2Set' + i)?.value)
      };
      sets.push(set);
    }

    const id1 = this.partidoForm.get('jugador1')?.value;
    const id2 = this.partidoForm.get('jugador2')?.value;
    const id3 = this.partidoForm.get('ganador')?.value;

    this.partido = {
      _id: this.id,
      jugador1: id1,
      jugador2: id2,
      ganador: id3,
      sets: sets
    };
    console.log(this.partido);
    this.apiservice.modificarPartido(this.partido._id, this.partido).subscribe(data => {
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
