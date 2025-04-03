import { Injectable } from '@angular/core';
import { MatiereSalleClassePersonnel } from 'app/models/matiere-salle-classe-personnel.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MatiereSalleClassePersonnelService {

  constructor(private apiService: ApiService) {}

  getAlls(): Observable<any> {
    return this.apiService.get('api/matiere-salle-classe-personnel');
  }

  getAllAnneeAndClasse(data:{annee_id,salle_classe_id?,personnel_id?}): Observable<any> {
    return this.apiService.post('api/matiere-salle-classe-personnel/findByAnneeAndSalleClasse',data);
  }

  get(id):Observable<MatiereSalleClassePersonnel>{
    return this.apiService.get('api/matiere-salle-classe-personnel/'+id);
  }

  add(matiereSalleClassePersonnel: MatiereSalleClassePersonnel): Observable<MatiereSalleClassePersonnel> {
      return this.apiService.post('api/matiere-salle-classe-personnel', matiereSalleClassePersonnel);
  }

  update(matiereSalleClassePersonnel: MatiereSalleClassePersonnel): Observable<MatiereSalleClassePersonnel> {
      return this.apiService.put('api/matiere-salle-classe-personnel/'+matiereSalleClassePersonnel.id , matiereSalleClassePersonnel);
  }
  
  delete(matiereSalleClassePersonnel: MatiereSalleClassePersonnel): Observable<any> {
      return this.apiService.delete('api/matiere-salle-classe-personnel/' + matiereSalleClassePersonnel.id);
  }

}