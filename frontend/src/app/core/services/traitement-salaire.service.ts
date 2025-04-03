import { Injectable } from '@angular/core';
import { TraitementSalaire } from 'app/models/traitement-salaire.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class TraitementSalaireService {
    constructor(private apiService: ApiService) {}

    getAll(): Observable<any[]> {
      return this.apiService.get('api/traitement');
    }

    delete(traitement: TraitementSalaire): Observable<any> {
        return this.apiService.delete('api/traitement-salaire/' + traitement.id);
    }

    getTraitementBy(data: {annee_id,mois,mois_lable:null}): Observable<any[]> {
        return this.apiService.post('api/traitement-salaire/getTraitementBy', data);
    }

    generationTraitement(data: {annee_id,mois,mois_lable:null}): Observable<TraitementSalaire> {
        return this.apiService.post('api/traitement-salaire/generationTraitement', data);
    }
    
    updateManyElement(traitementSalaires: TraitementSalaire[]): Observable<TraitementSalaire> {
        return this.apiService.post('api/traitement-salaire/updateManyElement', {traitementSalaires:traitementSalaires});
    }

    downloadTraitement(data: {annee_id,mois}): Observable<TraitementSalaire> {
        return this.apiService.post2('api/traitement-salaire/downloadTraitement', data);
    }

    update(traitement: TraitementSalaire): Observable<TraitementSalaire> {
        return this.apiService.put('api/traitement-salaire/' + traitement.id, traitement);
    }

    get(id): Observable<TraitementSalaire> {
        return this.apiService.get('api/traitement-salaire/' + id);
    }
}
