import { Injectable } from '@angular/core';
import { EvaluationTravail } from 'app/models/evaluation-travail.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluationTravailService {
  constructor(private apiService: ApiService) {}
  
  getAll():Observable<EvaluationTravail[]>{
    return this.apiService.get('api/evaluation-travail');
  }

  
  getByTrimestre(data:{trimestre,annee_id}):Observable<EvaluationTravail[]>{
    console.log(data)
    return this.apiService.post('api/evaluation-travail/getByTrimestre',data);
  }
  
  get(id):Observable<EvaluationTravail>{
    return this.apiService.get('api/evaluation-travail/'+id);
  }
  
  addOrUpdate(evaluationTravail: EvaluationTravail): Observable<EvaluationTravail> {
      return this.apiService.post('api/evaluation-travail', evaluationTravail);
  }

  update(evaluationTravail: EvaluationTravail): Observable<EvaluationTravail> {
      return this.apiService.put('api/evaluation-travail/'+evaluationTravail.id , evaluationTravail);
  }
  
  
  generationStatistic(evaluationTravail: EvaluationTravail): Observable<any> {
    console.log(evaluationTravail)
      return this.apiService.post('api/evaluation-travail/generation/statistic', evaluationTravail);
  }
  telechargerStatistique(data:{trimestre,annee_id}): Observable<EvaluationTravail> {
    console.log(data)
      return this.apiService.post2('api/evaluation-travail/telechargerStatistique', data);
  } 


  delete(rubrique: EvaluationTravail): Observable<any> {
    return this.apiService.delete('api/evaluation-travail/' + rubrique.id);
}
}
