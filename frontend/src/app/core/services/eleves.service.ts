import { Injectable } from '@angular/core';
import { Eleve } from 'app/models/eleve.model'; 
import { Observable } from 'rxjs';
import { ApiService } from './api.service'; 

@Injectable({
    providedIn: 'root',
})
export class ElevesService {
    constructor(private apiService: ApiService) {} 

    delete(eleve: Eleve): Observable<any> {
        return this.apiService.delete('api/eleves/' + eleve.id);
    }
    
    addOrUpdate(eleve: Eleve): Observable<Eleve> {
        return this.apiService.post('api/eleves', eleve);
    }

    update(eleve: Eleve): Observable<Eleve> {
        return this.apiService.put('api/eleves/'+eleve.id , eleve);
    }

    get(id):Observable<Eleve>{
      return this.apiService.get('api/eleves/'+id);
    }
    
    getAlls():Observable<Eleve[]>{
      return this.apiService.get('api/eleves');
    }
    
    removeAvatar(eleve_id): Observable<any>
    {    
        return this.apiService.get('api/eleves/removeAvatar/'+eleve_id);
    }
    
    uploadAvatar(eleve_id: string, avatar: File): Observable<any>
    {    
        let file: File = avatar;
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        formData.append('eleve_id', eleve_id);
        let headers = new Headers();
        /** In Angular 5, including the header Content-Type can invalidate your request */
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json'); 

        return this.apiService.post3('api/eleves/uploadAvatar',formData,{ headers: headers });
    }
    
    getAllWithInscription():Observable<any[]>{
        return this.apiService.get('api/eleves/getAllWithInscription/getAllWithInscription');
    }

    getAvatar(eleve_id): Observable<any> { 
        return this.apiService.get2('api/eleves/getAvatar/' + eleve_id);
    }
}
