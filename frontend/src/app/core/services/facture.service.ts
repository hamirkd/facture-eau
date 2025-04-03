import { Injectable } from '@angular/core';
import { Facture } from 'app/models/facture.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private apiService: ApiService) {}

  getAlls(): Observable<any> {
    return this.apiService.get('api/factures');
  }

  get(id):Observable<Facture>{
    return this.apiService.get('api/factures/'+id);
  }

  add(facture: Facture): Observable<Facture> {
      return this.apiService.post('api/factures', facture);
  }

  update(facture: Facture): Observable<Facture> {
      return this.apiService.put('api/facture/'+facture.id , facture);
  }
  
  delete(facture: Facture): Observable<any> {
      return this.apiService.delete('api/facture/' + facture.id);
  }
  
  findBy(data):Observable<Facture[]>{
    return this.apiService.post('api/facture/findBy', data);
  }
  
  findByNouvelleFacture(data):Observable<Facture[]>{
    return this.apiService.post('api/facture/nouvelle', data);
  }
  
  
    cancelle(data:{id,motif}):Observable<any>{ 
      return this.apiService.post('api/facture/cancelle',data);
    }
    restore(data:{id}):Observable<any>{ 
      return this.apiService.post('api/facture/restore',data);
    }

}