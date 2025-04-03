import { Injectable } from '@angular/core';
import { Versement } from 'app/models/versement.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class VersementsService {


  constructor(private apiService: ApiService) { }

  getAlls():Observable<any[]>{
    return this.apiService.get('api/versements');
  }
  addOrUpdate(data:any):Observable<any[]>{
    return this.apiService.post('api/versements',data);
  }
  getAllBy(data:any):Observable<any[]>{ 
    return this.apiService.post('api/versements/getByAnneeInscription',data);
  }

  
  getEleveDetailVersementByAnneeAndEleve(data:any):Observable<any[]>{ 
    return this.apiService.post('api/versements/getEleveDetailVersementByAnneeAndEleve',data);
  }
  /**
   * 
   * @param data {annee_id,datedebut,datefin}
   * @returns 
   */
  getVersementByAnneeOrAll(data:any):Observable<any[]>{ 
    return this.apiService.post('api/versements/getVersementByAnneeOrAll',data);
  }
  /**
   * 
   * @param data {annee_id,datedebut,datefin}
   * @returns 
   */
  getVersementByAnneeOrAllGroupeBy(data:any):Observable<any[]>{ 
    return this.apiService.post('api/versements/getVersementByAnneeOrAllGroupeBy',data);
  }
  /**
   * 
   * @param data {annee_id,datedebut,datefin}
   * @returns 
   */
  getVersementByAnneeOrAllGroupeByImpression(data:any):Observable<any[]>{ 
    return this.apiService.post2('api/versements/getVersementByAnneeOrAllGroupeByImpression',data);
  }

  cancelle(data:{id,motif}):Observable<any>{ 
    return this.apiService.post('api/versements/cancelle',data);
  }
  restore(data:{id}):Observable<any>{ 
    return this.apiService.post('api/versements/restore',data);
  }

  delete(versement:Versement):Observable<any>{ 
    return this.apiService.delete('api/versements/'+versement.id);
  }
}
