import { Injectable } from '@angular/core';
import { Matiere } from 'app/models/matiere.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  constructor(private apiService: ApiService) {}

  getAlls(): Observable<any> {
    return this.apiService.get('api/matiere');
  }

  getAllByAnnee(annee_id): Observable<any> {
    return this.apiService.get('api/matiere/getByAnnee/'+annee_id);
  }

  getAllByAnneeAndSalle(data:{annee_id,salle_classe_id,personnel_id?}): Observable<any> {
    return this.apiService.post('api/matiere/getAllByAnneeAndSallePersonnel',data);
  }

  get(id):Observable<Matiere>{
    return this.apiService.get('api/matiere/'+id);
  }

  add(matiere: Matiere): Observable<Matiere> {
      return this.apiService.post('api/matiere', matiere);
  }

  update(matiere: Matiere): Observable<Matiere> {
      return this.apiService.put('api/matiere/'+matiere.id , matiere);
  }
  
  delete(matiere: Matiere): Observable<any> {
      return this.apiService.delete('api/matiere/' + matiere.id);
  }

}