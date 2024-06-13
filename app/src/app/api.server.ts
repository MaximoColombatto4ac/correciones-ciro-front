import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Tenista } from './tenista/tenista';

@Injectable({ 
    providedIn: 'root'
}) 
export class ApiService { 
    private urlApi = 'http://localhost:3000/api'
    private tenistaApi = "/tenistas"
    private partidoApi = "/partidos"
    constructor(private http: HttpClient) { } 

    getTenistas() { 
        return this.http.get( 
            `${this.urlApi}${this.tenistaApi}`); 
    }
    
    getTenista(id: string) {
        let aux: any;
        try {
            aux = this.http.get(
                `${this.urlApi}${this.tenistaApi}/${id}`
            );
        } catch {
            console.log("No se encontró el tenista con el id: " + id + " en la base de datos");
        }
        return aux;
    }
    
    addTenista(tenista: Tenista) {
        console.log(tenista);
        return this.http.post(
            `${this.urlApi}${this.tenistaApi}`, tenista
        );
    }
    
    modificarTenista(tenista: Tenista) {
        console.log(tenista);
        
        return this.http.patch(
            `${this.urlApi}${this.tenistaApi}`, tenista
        );
    }
    
    eliminarTenista(id: string) {
        return this.http.delete(
            `${this.urlApi}${this.tenistaApi}/${id}`
        );
    }
    
    getPartidos() {
        return this.http.get(
            `${this.urlApi}${this.partidoApi}`);
    }
    
    getPartido(id: string) {
        let aux: any;
        try {
            aux = this.http.get(
                `${this.urlApi}${this.partidoApi}/${id}`
            );
        } catch {
            console.log("No se encontró el partido con el id: " + id + " en la base de datos");
        }
        return aux;
    }
    
    addPartido(partido: any) {
        return this.http.post(
            `${this.urlApi}${this.partidoApi}`, partido
        );
    }
    
    modificarPartido(id: any, partido: any) {
        return this.http.patch(
            `${this.urlApi}${this.partidoApi}/${id}`, partido
        );
    }
    
    eliminarPartido(id: number) {
        return this.http.delete(
            `${this.urlApi}${this.partidoApi}/${id}`
        );
    }
}
