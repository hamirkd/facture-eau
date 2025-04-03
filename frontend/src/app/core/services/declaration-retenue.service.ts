import { Injectable } from '@angular/core';
import { DeclarationRetenue } from 'app/models/declaration-retenue.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { SocieteService } from './societe.service';

@Injectable({
  providedIn: 'root'
})
export class DeclarationRetenueService {

  constructor(private _societeService:SocieteService,private apiService: ApiService) { }
  
  
  getAlls(): Observable<DeclarationRetenue[]> {
    return this.apiService.get('api/declaration-retenue');
}
  
getAllByCurrentSociete(): Observable<DeclarationRetenue[]> {
  return this.apiService.get('api/declaration-retenue/societe/'+this._societeService.activeSociete.id);
}
  
get(id): Observable<DeclarationRetenue> {
  return this.apiService.get('api/declaration-retenue/'+id);
}

  add(declarationRetenue: DeclarationRetenue): Observable<DeclarationRetenue> {
    const societe_id = this._societeService.activeSociete.id;
    declarationRetenue.societe_id = societe_id;
    console.log(declarationRetenue)
      return this.apiService.post('api/declaration-retenue', declarationRetenue);
  }

  update(declarationRetenue: DeclarationRetenue): Observable<DeclarationRetenue> {
      const societe_id = this._societeService.activeSociete.id;
      declarationRetenue.societe_id = societe_id;
      return this.apiService.put('api/declaration-retenue/'+declarationRetenue.id , declarationRetenue);
  }

  
  edit11(d:{mois,annee,societe_id}): Observable<any> {
    return this.apiService.post2('api/declaration-retenue/edit11', d);
  }
  
  edit10xls(d:{mois,annee,societe_id}): Observable<any> {
    return this.apiService.post2('api/declaration-retenue/edit10xls', d);
  }
  
  getByMoisAnnee(d:{societe_id,mois,annee}): 
  Observable<any> {
    console.log(d);
    return this.apiService.post('api/declaration-retenue/getByMoisAnnee', d);
  }

  saveManySalariesInDeclarationRetenu(declarationRetenueSalarie:{salaries,mois,annee,societe_id}): Observable<any> {
    console.log(declarationRetenueSalarie);
    return this.apiService.post('api/declaration-retenue/saveManySalariesInDeclarationRetenu',declarationRetenueSalarie);
  }
  getSalariesByMoisAnneeSociete(declarationRetenueSalarie:{mois,annee,societe_id}): Observable<any> {
    console.log(declarationRetenueSalarie);
    return this.apiService.post('api/declaration-retenue/getSalariesByMoisAnneeSociete',declarationRetenueSalarie);
  }
  
  
  delete(declarationRetenue: DeclarationRetenue): Observable<any> {
      return this.apiService.delete('api/declaration-retenue/'+ declarationRetenue.id);
  }
}
