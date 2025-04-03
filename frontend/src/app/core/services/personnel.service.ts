import { Injectable } from '@angular/core';
import { Personnel } from 'app/models/personnel.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  constructor(private apiService: ApiService) {}

  getAlls(): Observable<any> {
    return this.apiService.get('api/personnel');
  }

  get(id):Observable<Personnel>{
    return this.apiService.get('api/personnel/'+id);
  }

  add(personnel: Personnel): Observable<Personnel> {
      return this.apiService.post('api/personnel', personnel);
  }

  update(personnel: Personnel): Observable<Personnel> {
      return this.apiService.put('api/personnel/'+personnel.id , personnel);
  }
  
  delete(personnel: Personnel): Observable<any> {
      return this.apiService.delete('api/personnel/' + personnel.id);
  }
    
  removeAvatar(personnel_id): Observable<any>
  {    
      return this.apiService.get('api/personnel/removeAvatar/'+personnel_id);
  }
  
  uploadAvatar(personnel_id: string, avatar: File): Observable<any>
  {    
      let file: File = avatar;
      let formData:FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      formData.append('personnel_id', personnel_id);
      let headers = new Headers();
      /** In Angular 5, including the header Content-Type can invalidate your request */
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json'); 

      return this.apiService.post3('api/personnel/uploadAvatar',formData,{ headers: headers });
  }

}