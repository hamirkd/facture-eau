import { Injectable } from '@angular/core';
import { SalarieComplement } from 'app/models/salarie-complement-1.model';
import { TraitementDas } from 'app/models/traitement-das.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { SocieteService } from './societe.service';

@Injectable({
  providedIn: 'root'
})
export class TraitementDasService {

  constructor(private _societeService:SocieteService,private apiService: ApiService) { }
  
  
  getAlls(): Observable<TraitementDas[]> {
    return this.apiService.get('api/traitement-das');
}
  
getAllByCurrentSociete(): Observable<TraitementDas[]> {
  return this.apiService.get('api/traitement-das/societe/'+this._societeService.activeSociete.id);
}
  
get(id): Observable<TraitementDas> {
  return this.apiService.get('api/traitement-das/'+id);
}

  add(traitementDas: TraitementDas): Observable<TraitementDas> {
    const societe_id = this._societeService.activeSociete.id;
    traitementDas.societe_id = societe_id;
    console.log(traitementDas)
      return this.apiService.post('api/traitement-das', traitementDas);
  }

  update(traitementDas: TraitementDas): Observable<TraitementDas> {
      const societe_id = this._societeService.activeSociete.id;
      traitementDas.societe_id = societe_id;
      return this.apiService.put('api/traitement-das/'+traitementDas.id , traitementDas);
  }

  
  editID22(d:{annee,societe_id}): Observable<any> {
    console.log(d)
    return this.apiService.post2('api/traitement-das/editID22', d);
  }
  editID21(d:{annee,societe_id}): Observable<any> {
    return this.apiService.post2('api/traitement-das/editID21', d);
  }

  editID21PDF(d:{annee,societe_id}): Observable<any> {
    return this.apiService.post2('api/traitement-das/editID21PDF', d);
  }
  
  editID20(d:{annee,societe_id}): Observable<any> {
    return this.apiService.post2('api/traitement-das/editID20', d);
  }
  editID20PDF(d:{annee,societe_id}): Observable<any> {
    return this.apiService.post2('api/traitement-das/editID20PDF', d);
  }
  editID19(d:{annee,societe_id,salarie_id}): Observable<any> {
    console.log(d)
    return this.apiService.post2('api/traitement-das/editID19', d);
  }
  
  edit10xls(d:{annee,societe_id}): Observable<any> {
    return this.apiService.post2('api/traitement-das/edit10xls', d);
  }
  
  getByAnnee(d:{societe_id,annee}): 
  Observable<any> {
    console.log(d);
    return this.apiService.post('api/traitement-das/getByAnnee', d);
  }

  saveManySalariesInTraitementDas(traitementDasSalarie:{traitementDas,salaries,annee,societe_id}): Observable<any> {
    return this.apiService.post('api/traitement-das/saveManySalariesInTraitementDas',traitementDasSalarie);
  }
  
  updateSalarie(salarie: SalarieComplement): Observable<any> {
      return this.apiService.put('api/traitement-das/updateSalarie/'+salarie.id, salarie);
  }
  
  getSalariesById(id:number): 
  Observable<any> {
    return this.apiService.get('api/traitement-das/getSalariesById/'+id);
  }

  getSalariesByAnneeSociete(traitementDasSalarie:{annee,societe_id}): Observable<any> {
    console.log(traitementDasSalarie);
    return this.apiService.post('api/traitement-das/getSalariesByAnneeSociete',traitementDasSalarie);
  }
  
  
  delete(traitementDas: TraitementDas): Observable<any> {
      return this.apiService.delete('api/traitement-das/'+ traitementDas.id);
  } 
  
  deleteManySalariesInTraitementDas(traitementDasSalarie:{ids:number[]}): Observable<any> {
    console.log(traitementDasSalarie);
    return this.apiService.post('api/traitement-das/deleteManySalariesInTraitementDas',traitementDasSalarie);
  }
}
