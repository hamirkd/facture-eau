import { Injectable } from '@angular/core';
import { AnneeScolaire } from 'app/models/annee-scolaire.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class AnneeService {
    constructor(private apiService: ApiService) {}

    getAll() {
        return [2020, 2021, 2022, 2023];
    }
    getAlls(): Observable<any[]> {
        return this.apiService.get('api/annee-scolaire');
    }

    set activeAnnee(annee: AnneeScolaire) {
        localStorage.setItem('activeAnnee', JSON.stringify(annee));
    }

    get activeAnnee(): AnneeScolaire {
        if (localStorage.getItem('activeAnnee')) {
            return JSON.parse(
                localStorage.getItem('activeAnnee')
            ) as AnneeScolaire;
        }
    }
}
