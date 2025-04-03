import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  constructor(private apiService: ApiService) { }

  getAlls():Observable<any[]>{
    return this.apiService.get('api/inscriptions');
  }
  addOrUpdate(data:any):Observable<any>{
    console.log(data)
    return this.apiService.post('api/inscriptions',data);
  }

  update(data:any):Observable<any>{
    return this.apiService.put('api/inscriptions/'+data.id,data);
  }
  /**
   * 
   * @param data {annee_id}
   * @returns 
   */
  getAllBy(data:any):Observable<any[]>{
    return this.apiService.post('api/inscriptions/getListEleveInscritOrNotInscritByAnnee',data);
  }


  getInscriptionByEleveAndAnnee(data:{annee_id,eleve_id}):Observable<any>{
    return this.apiService.post('api/inscriptions/getInscriptionByEleveAndAnnee',data);
  }

  /***
   * @param data {annee_id,salle_classe_id,classe_id}
   */
   getAllByAnneeAndClasseAndSalleClasse(data:{annee_id,salle_classe_id,classe_id}):Observable<any[]>{
    return this.apiService.post('api/inscriptions/getAllByAnneeAndClasseAndSalleClasse',data);
  }
  /***
   * @param data {annee_id,salle_classe_id,classe_id}
   */
  getAllByAnneeAndClasseAndSalleClasseAndMontantVerseAndScolarite(data:{annee_id,salle_classe_id,classe_id}):Observable<any[]>{
    return this.apiService.post('api/inscriptions/getAllByAnneeAndClasseAndSalleClasseAndMontantVerseAndScolarite',data);
  }

  /***
   * @param data {annee_id,salle_classe_id,classe_id}
   */
   getImprimeAllByAnneeAndClasseAndSalleClasse(data:{annee_id,salle_classe_id,classe_id}):Observable<any[]>{
    console.log(data)
    return this.apiService.post2('api/inscriptions/getImprimeAllByAnneeAndClasseAndSalleClasse',data);
  }
  
  
}
