import { Injectable } from '@angular/core';
import { BulletinMoyenne } from 'app/models/bulletin-moyenne.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BulletinMoyenneService {

  constructor(private apiService: ApiService) {}

      getAlls(): Observable<any> {
        return this.apiService.get('api/bulletin-moyenne');
      }

      get(id):Observable<BulletinMoyenne>{
        return this.apiService.get('api/bulletin-moyenne/'+id);
      }

      add(bulletinMoyenne: BulletinMoyenne): Observable<BulletinMoyenne> {
          return this.apiService.post('api/bulletin-moyenne', bulletinMoyenne);
      }
      addOrUpdate(bulletinMoyenne: BulletinMoyenne): Observable<BulletinMoyenne> {
        console.log(bulletinMoyenne)
          return this.apiService.post('api/bulletin-moyenne/addOrUpdate', bulletinMoyenne);
      }

      getAllBulletinMoyenneSalleClasseAnneeTrimestre(data:{annee_id,salle_classe_id,trimestre,matiere_id}): Observable<[]> {
        console.log(data)
        return this.apiService.post('api/bulletin-moyenne/getAllBulletinMoyenneSalleClasseAnneeTrimestre', data);
      }

      recalculeDesMoyennesEcompletude(data:{annee_id,salle_classe_id,trimestre,matiere_id}): Observable<[]> {
        console.log(data)
        return this.apiService.post('api/bulletin-moyenne/recalculeDesMoyennesEcompletude', data);
      }

      recalculeDesMoyennesEcompletudeBulletin(data:{annee_id,salle_classe_id,trimestre}): Observable<[]> {
        console.log(data)
        return this.apiService.post('api/bulletin-moyenne/recalculeDesMoyennesEcompletudeBulletin', data);
      }

      telechargerBulletin(data:{annee_id,salle_classe_id,trimestre}): Observable<[]> {
         
        return this.apiService.post2('api/bulletin-moyenne/telechargerBulletin', data);
      }

      telechargerUnBulletin(data:{bulletin_id}): Observable<[]> {
         
        return this.apiService.post2('api/bulletin-moyenne/telechargerUnBulletin', data);
      }

      telechargerDeliberation(data:{annee_id,salle_classe_id,trimestre,typefichier}): Observable<[]> {
         
        return this.apiService.post2('api/bulletin-moyenne/telechargerDeliberation', data);
      }

      getAllBulletinMoyenneSalleClasseAnneeTrimestreForAllMatiere(data:{annee_id,salle_classe_id,trimestre}): Observable<[]> {
        return this.apiService.post('api/bulletin-moyenne/getAllBulletinMoyenneSalleClasseAnneeTrimestreForAllMatiere', data);
      }

      getBulletinMoyenneByAnneeTrimestreForAllMatiereByEleve(data:{annee_id,eleve_id,trimestre}): Observable<{}> {
        return this.apiService.post('api/bulletin-moyenne/getBulletinMoyenneByAnneeTrimestreForAllMatiereByEleve', data);
      }
      getBulletinMoyenneByAnneeTrimestreForAllMatiereByEleveImprimer(data:{annee_id,eleve_id,trimestre}): Observable<{}> {
        console.log(data)
        return this.apiService.post2('api/bulletin-moyenne/getBulletinMoyenneByAnneeTrimestreForAllMatiereByEleveImprimer', data);
      }
      

      update(bulletinMoyenne: BulletinMoyenne): Observable<BulletinMoyenne> {
          return this.apiService.put('api/bulletin-moyenne/'+bulletinMoyenne.id , bulletinMoyenne);
      }
      
      delete(bulletinMoyenne: BulletinMoyenne): Observable<any> {
          return this.apiService.delete('api/bulletin-moyenne/' + bulletinMoyenne.id);
      }
    }
