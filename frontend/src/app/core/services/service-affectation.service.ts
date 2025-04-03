import { Injectable } from '@angular/core';
import { ServiceAffectation } from 'app/models/service-affectation.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceAffectationService {
  constructor(private apiService: ApiService) {}

  getAlls(): Observable<any> {
    return this.apiService.get('api/service-affectation');
  }

  get(id):Observable<ServiceAffectation>{
    return this.apiService.get('api/service-affectation/'+id);
  }

  add(serviceAffectation: ServiceAffectation): Observable<ServiceAffectation> {
      return this.apiService.post('api/service-affectation', serviceAffectation);
  }

  update(serviceAffectation: ServiceAffectation): Observable<ServiceAffectation> {
      return this.apiService.put('api/service-affectation/'+serviceAffectation.id , serviceAffectation);
  }
  
  delete(serviceAffectation: ServiceAffectation): Observable<any> {
      return this.apiService.delete('api/service-affectation/' + serviceAffectation.id);
  }

}