import { Injectable } from '@angular/core';
import { Scolarite } from 'app/models/scolarite.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ScolaritesService {

  constructor(private apiService: ApiService) { }
  

  getAlls():Observable<any[]>{
    return this.apiService.get('api/scolarites');
  }
  addOrUpdate(data:any):Observable<any[]>{
    console.log(data)
    return this.apiService.post('api/scolarites',data);
  }
  getAllBy(data:any):Observable<any[]>{
    console.log(data)
    return this.apiService.post('api/scolarites/getByAnneeSalleClasseSerie',data);
  }
  getAllByAnnee(data:any):Observable<any[]>{
    return this.apiService.post('api/scolarites/getListByAnnee',data);
  }
  //classe_id,serie,annee_id
  getOneBy(data:any):Observable<any>{
    return this.apiService.post('api/scolarites/getByAnneeClasseSerie',data);
  }
  delete(scolarite: Scolarite): Observable<any> {
      return this.apiService.delete('api/scolarites/'+ scolarite.id);
  }



}
