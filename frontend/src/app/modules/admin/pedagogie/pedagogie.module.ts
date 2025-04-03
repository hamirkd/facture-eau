import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedagogieComponent } from './pedagogie.component';
import { IndexComponent } from './index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { RegistreNumeriqueComponent } from './registre-numerique/registre-numerique.component';
import { AddElevesComponent } from './registre-numerique/add-eleves/add-eleves.component';
import { AddSalleClasseComponent } from './classes/add-salle-classe/add-salle-classe.component';
import { SalleClasseComponent } from '../scolarite/salle-classe/salle-classe.component';
import { CategorieMatieresComponent } from './categorie-matieres/categorie-matieres.component';
import { AddCategorieMatiereComponent } from './categorie-matieres/add-categorie-matiere/add-categorie-matiere.component';
import { MatieresComponent } from './matieres/matieres.component';
import { AddMatiereComponent } from './matieres/add-matiere/add-matiere.component';
import { AddMatiereSalleClassePersonnel } from './matiere-salle-classe-personnels/add-matiere-salle-classe-personnel/add-matiere-salle-classe-personnel.component';
import { MatiereSalleClassePersonnelsComponent } from './matiere-salle-classe-personnels/matiere-salle-classe-personnels.component';
import { EleveClasseComponent } from './eleve-classe/eleve-classe.component';
import { EleveClasseAffectationComponent } from './eleve-classe/eleve-classe-affectation/eleve-classe-affectation.component';
import { EleveClasseAffectationMasseComponent } from './eleve-classe/eleve-classe-affectation-masse/eleve-classe-affectation-masse.component';
import { EleveMoyenneComponent } from './registre-numerique/eleve-moyenne/eleve-moyenne.component';
import { EleveMoyenneEditComponent } from './registre-numerique/eleve-moyenne-edit/eleve-moyenne-edit.component';
import { BulletinEleveComponent } from './registre-numerique/bulletin-eleve/bulletin-eleve.component';
import { SubdivisionScolaireComponent } from './subdivision-scolaire/subdivision-scolaire.component';
import { AddSubdivisionScolaireComponent } from './subdivision-scolaire/add-categorie-matiere/add-subdivision-scolaire.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { StatisticDetailComponent } from './statistique/statistic-detail/statistic-detail.component';
import { EleveDetailComponent } from './eleve-classe/eleve-detail/eleve-detail.component';
import { EleveEditComponent } from './eleve-classe/eleve-detail/eleve-edit/eleve-edit.component';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'registre-numerique', component: RegistreNumeriqueComponent },
  { path: 'salle-classe', component: SalleClasseComponent },
  { path: 'categorie-matiere', component: CategorieMatieresComponent },
  { path: 'add-categorie-matiere', component: AddCategorieMatiereComponent },
  { path: 'matiere', component: MatieresComponent },
  { path: 'add-matiere', component: AddMatiereComponent },
  { path: 'subdivision-scolaire', component: SubdivisionScolaireComponent },
  { path: 'add-subdivision-scolaire', component: AddSubdivisionScolaireComponent },
  { path: 'matiere-salle-classe-personnel', component: MatiereSalleClassePersonnelsComponent },
  { path: 'eleve-classe', component: EleveClasseComponent },
  { path: 'eleve-classe-affectation', component: EleveClasseAffectationComponent },
  { path: 'eleve-moyenne-edit/:salle_classe_id/:trimestre', component: EleveMoyenneEditComponent },
  { path: 'eleve-classe-detail/:eleve_id', component: EleveDetailComponent },
  { path: 'eleve-moyenne-edit', component: EleveMoyenneEditComponent },
  { path: 'statistics', component: StatistiqueComponent },
];


@NgModule({
  declarations: [
    PedagogieComponent,
    IndexComponent,
    RegistreNumeriqueComponent,
    AddElevesComponent,
    SubdivisionScolaireComponent,
    AddSubdivisionScolaireComponent,
    AddSalleClasseComponent,CategorieMatieresComponent,AddCategorieMatiereComponent,
    MatieresComponent,AddMatiereComponent,MatiereSalleClassePersonnelsComponent,AddMatiereSalleClassePersonnel, EleveClasseComponent, EleveClasseAffectationComponent, EleveClasseAffectationMasseComponent, EleveMoyenneComponent, EleveMoyenneEditComponent, BulletinEleveComponent, StatistiqueComponent, StatisticDetailComponent, EleveDetailComponent, EleveEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),MatRadioModule,
    MatIconModule,SharedModule
  ]
})
export class PedagogieModule { }
