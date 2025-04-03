import { Injectable } from '@angular/core';
import { Depense } from 'app/models/depense.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class DepenseService {
    constructor(private apiService: ApiService) {}

    getAll(): Observable<any[]> {
      return this.apiService.get('api/depense');
    }

    delete(depense: Depense): Observable<any> {
        return this.apiService.delete('api/depense/' + depense.id);
    }

    getDashBoardStatistic(){
        return this.apiService.post('api/depense/getDashBoardStatistic',{});
    }

    getDepenseByBetweenTwoDate(data: {datedebut,datefin}): Observable<any[]> {
        console.log(data)
        return this.apiService.post('api/depense/getDepenseByBetweenTwoDate', data);
    }

    add(depense: Depense): Observable<Depense> {
        return this.apiService.post('api/depense', depense);
    }

    update(depense: Depense): Observable<Depense> {
        return this.apiService.put('api/depense/' + depense.id, depense);
    }

    get(id): Observable<Depense> {
        return this.apiService.get('api/depense/' + id);
    }
    
    cancelle(data:{id,motif}):Observable<any>{ 
        return this.apiService.post('api/depense/cancelle',data);
    }
    
    restore(data:{id}):Observable<any>{ 
        return this.apiService.post('api/depense/restore',data);
    }

}
