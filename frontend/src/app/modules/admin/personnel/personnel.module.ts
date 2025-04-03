import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonnelComponent } from './personnel.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { AddPersonnelComponent } from './personnel/add-personnel/add-personnel.component';
import { ListPersonnelComponent } from './personnel/list-personnel/list-personnel.component';
import { DetailPersonnelComponent } from './personnel/detail-personnel/detail-personnel.component';
import { PostesComponent } from './parametrage/poste/postes.component';
import { AddPosteComponent } from './parametrage/poste/add-poste/add-postes.component';
import { AddServiceAffectationComponent } from './parametrage/service-affectation/add-service-affectation/add-service-affectation.component';
import { ServiceAffectationsComponent } from './parametrage/service-affectation/service-affectation.component';
import { ListContratComponent } from './contrat/list-contrat/list-contrat.component';
import { DetailContratComponent } from './contrat/detail-contrat/detail-contrat.component';
import { AddContratComponent } from './contrat/add-contrat/add-contrat.component';
import { RuptureContratComponent } from './contrat/rupture-contrat/rupture-contrat.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


const routes: Routes = [
  { path: '', component: PersonnelComponent },
  { path: 'list', component: ListPersonnelComponent },
  { path: 'show/:personnel_id', component: DetailPersonnelComponent },
  { path: 'postes', component: PostesComponent },
  { path: 'service-affectations', component: ServiceAffectationsComponent },
  { path: 'contrat', component: ListContratComponent },
  { path: 'contrat/show/:contrat_id', component: DetailContratComponent },
];

@NgModule({
  declarations: [
    PersonnelComponent,
    AddPersonnelComponent,ListPersonnelComponent,DetailPersonnelComponent,
    PostesComponent,AddPosteComponent, AddServiceAffectationComponent,
    ServiceAffectationsComponent, DetailContratComponent,ListContratComponent, AddContratComponent, RuptureContratComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,SharedModule, TranslateModule
  ],
  providers: [TranslateService]
})
export class PersonnelModule { }
