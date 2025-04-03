import { Injectable } from '@angular/core';
import { SalleClasse } from 'app/models/salle-classe.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class SalleClasseService {
    constructor(private apiService: ApiService) {}

    getAll(): SalleClasse[] {
        return [new SalleClasse({ id: 1, libelle: '6EME', classe_id: 1 })];
    }

    delete(salleClasse: SalleClasse): Observable<any> {
        return this.apiService.delete('api/salle-classe/' + salleClasse.id);
    }
    getSalleClasseByAnnee(data: any): Observable<any[]> {
        return this.apiService.post('api/salle-classe/getListByAnnee', data);
    }

    getSalleClasseByAnneeAndClasse(data: any): Observable<any[]> {
        return this.apiService.post('api/salle-classe/getSalleClasseByAnneeAndClasse', data);
    }
    

    add(salleClasse: SalleClasse): Observable<SalleClasse> {
        return this.apiService.post('api/salle-classe', salleClasse);
    }

    update(salleClasse: SalleClasse): Observable<SalleClasse> {
        return this.apiService.put('api/salle-classe/'+salleClasse.id , salleClasse);
    }

    get(id):Observable<SalleClasse>{
      return this.apiService.get('api/salle-classe/'+id);
    }

}
