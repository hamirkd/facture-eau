import { Injectable } from '@angular/core';
import { CategorieDepense } from 'app/models/categorie-depense.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class CategorieDepenseService {
    constructor(private apiService: ApiService) {}

    getAll(): Observable<any[]> {
      return this.apiService.get('api/categorie-depense');
    }

    delete(categorieDepense: CategorieDepense): Observable<any> {
        return this.apiService.delete('api/categorie-depense/' + categorieDepense.id);
    } 

    add(categorieDepense: CategorieDepense): Observable<CategorieDepense> {
        return this.apiService.post('api/categorie-depense', categorieDepense);
    }

    update(categorieDepense: CategorieDepense): Observable<CategorieDepense> {
        return this.apiService.put('api/categorie-depense/' + categorieDepense.id, categorieDepense);
    }

    get(id): Observable<CategorieDepense> {
        return this.apiService.get('api/categorie-depense/' + id);
    }
}
