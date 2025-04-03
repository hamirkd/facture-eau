import { Injectable } from '@angular/core';
import { Poste } from 'app/models/poste.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PosteService {
  constructor(private apiService: ApiService) {}

  getAlls(): Observable<any> {
    return this.apiService.get('api/poste');
  }
  
  get(id):Observable<Poste>{
    return this.apiService.get('api/poste/'+id);
  }

  add(poste: Poste): Observable<Poste> {
      return this.apiService.post('api/poste', poste);
  }

  update(poste: Poste): Observable<Poste> {
      return this.apiService.put('api/poste/'+poste.id , poste);
  }
  
  delete(poste: Poste): Observable<any> {
      return this.apiService.delete('api/poste/' + poste.id);
  }

}