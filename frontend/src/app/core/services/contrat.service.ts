import { Injectable } from '@angular/core';
import { Contrat } from 'app/models/contrat.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  constructor(private apiService: ApiService) {}

  getAlls(): Observable<any> {
    return this.apiService.get('api/contrat');
  }

  get(id):Observable<Contrat>{
    return this.apiService.get('api/contrat/'+id);
  }

  add(contrat: Contrat): Observable<Contrat> {
      return this.apiService.post('api/contrat', contrat);
  }

  update(contrat: Contrat): Observable<Contrat> {
      return this.apiService.put('api/contrat/'+contrat.id , contrat);
  }
  
  delete(contrat: Contrat): Observable<any> {
      return this.apiService.delete('api/contrat/' + contrat.id);
  }

  generer(id):Observable<Contrat>{
    return this.apiService.get2('api/contrat/generercontrat/'+id);
  }
  
  genererToUrl(id):any{
    window.open(this.apiService.getUrlTo('api/contrat/generercontrat/'+id),'_blank');
    
  }
}