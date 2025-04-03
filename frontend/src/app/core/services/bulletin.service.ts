import { Injectable } from '@angular/core';
import { Bulletin } from 'app/models/bulletin.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class BulletinService {
    constructor(private apiService: ApiService) {}

    getAll(): Observable<any[]> {
      return this.apiService.get('api/bulletin');
    }

    delete(bulletin: Bulletin): Observable<any> {
        return this.apiService.delete('api/bulletin/' + bulletin.id);
    }

    add(bulletin: Bulletin): Observable<Bulletin> {
        return this.apiService.post('api/bulletin', bulletin);
    }

    update(bulletin: Bulletin): Observable<Bulletin> {
        return this.apiService.put('api/bulletin/' + bulletin.id, bulletin);
    }

    getAllBulletinByAnneeScolaireEleve(data:{eleve_id,annee_id}){
        return this.apiService.post('api/bulletin/getAllBulletinByAnneeScolaireEleve', data);
    }
    
    deleteAllInformationOfBulletin(bulletin: Bulletin): Observable<any> {
        console.log(bulletin)
        return this.apiService.delete('api/bulletin/deleteAllInformationOfBulletin/' + bulletin.id);
    }


    get(id): Observable<Bulletin> {
        return this.apiService.get('api/bulletin/' + id);
    }
}
