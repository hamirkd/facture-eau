import { Injectable } from '@angular/core';
import { DesignationDepense } from 'app/models/designation-depense.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class DesignationDepenseService {
    constructor(private apiService: ApiService) {}

    getAll(): Observable<any[]> {
      return this.apiService.get('api/designation-depense');
    }

    delete(designationDepense: DesignationDepense): Observable<any> {
        return this.apiService.delete('api/designation-depense/' + designationDepense.id);
    } 

    add(designationDepense: DesignationDepense): Observable<DesignationDepense> {
        return this.apiService.post('api/designation-depense', designationDepense);
    }

    update(designationDepense: DesignationDepense): Observable<DesignationDepense> {
        return this.apiService.put('api/designation-depense/' + designationDepense.id, designationDepense);
    }

    get(id): Observable<DesignationDepense> {
        return this.apiService.get('api/designation-depense/' + id);
    }
}
