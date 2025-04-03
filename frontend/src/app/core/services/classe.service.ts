import { Injectable } from '@angular/core';
import { Classe } from 'app/models/classe.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class ClasseService {
    constructor(private apiService: ApiService) {}

    getAll(): Observable<any[]> {
      return this.apiService.get('api/classe');
    }

    delete(classe: Classe): Observable<any> {
        return this.apiService.delete('api/classe/' + classe.id);
    }
    getClasseByAnnee(data: any): Observable<any[]> {
        return this.apiService.post('api/classe/getListByAnnee', data);
    }

    add(classe: Classe): Observable<Classe> {
        return this.apiService.post('api/classe', classe);
    }

    update(classe: Classe): Observable<Classe> {
        return this.apiService.put('api/classe/' + classe.id, classe);
    }

    get(id): Observable<Classe> {
        return this.apiService.get('api/classe/' + id);
    }
}
