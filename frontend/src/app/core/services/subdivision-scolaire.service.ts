import { Injectable } from '@angular/core';
import { SubdivisionScolaire } from 'app/models/subdivision-scolaire.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class SubdivisionScolaireService {
    constructor(private apiService: ApiService) {}

    getAll(): Observable<any[]> {
      return this.apiService.get('api/subdivision-scolaire');
    }
    
    getAllValide(): Observable<any[]> {
      return this.apiService.get('api/subdivision-scolaire/getValide/getValide');
    }

    add(subdivisionScolaire: SubdivisionScolaire): Observable<SubdivisionScolaire> {
        return this.apiService.post('api/subdivision-scolaire', subdivisionScolaire);
    }

    update(subdivisionScolaire: SubdivisionScolaire): Observable<SubdivisionScolaire> {
        return this.apiService.put('api/subdivision-scolaire/' + subdivisionScolaire.id, subdivisionScolaire);
    }

    get(id): Observable<SubdivisionScolaire> {
        return this.apiService.get('api/subdivision-scolaire/' + id);
    }

    delete(subdivisionScolaire: SubdivisionScolaire): Observable<any> {
        return this.apiService.delete('api/subdivision-scolaire/'+ subdivisionScolaire.id);
    }
}
