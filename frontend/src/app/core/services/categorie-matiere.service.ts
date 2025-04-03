import { Injectable } from '@angular/core';
import { CategorieMatiere } from 'app/models/categorie-matiere.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategorieMatiereService {
  constructor(private apiService: ApiService) {}

      getAlls(): Observable<any> {
        return this.apiService.get('api/categorie-matiere');
      }

      get(id):Observable<CategorieMatiere>{
        return this.apiService.get('api/categorie-matiere/'+id);
      }

      add(categorieMatiere: CategorieMatiere): Observable<CategorieMatiere> {
          return this.apiService.post('api/categorie-matiere', categorieMatiere);
      }

      update(categorieMatiere: CategorieMatiere): Observable<CategorieMatiere> {
          return this.apiService.put('api/categorie-matiere/'+categorieMatiere.id , categorieMatiere);
      }
      
      delete(categorieMatiere: CategorieMatiere): Observable<any> {
          return this.apiService.delete('api/categorie-matiere/' + categorieMatiere.id);
      }

}
