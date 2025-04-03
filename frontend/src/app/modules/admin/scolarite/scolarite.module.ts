import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScolariteComponent } from './scolarite.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { InscriptionComponent } from './inscription/inscription.component';
import { SelectEleveComponent } from './inscription/select-eleve/select-eleve.component';
import { ElevesInscritComponent } from './eleves-inscrit/eleves-inscrit.component';
import { ScolarisationComponent } from './scolarisation/scolarisation.component';
import { SalleClasseComponent } from './salle-classe/salle-classe.component';
import { AddSalleClasseComponent } from './salle-classe/add-salle-classe/add-salle-classe.component';
import { AddScolarisationComponent } from './scolarisation/add-scolarisation/add-scolarisation.component';
import { CaisseVersementComponent } from './caisse-versement/caisse-versement.component';
import { ElevesArchiveComponent } from './eleves-archive/eleves-archive.component';
import { ImpressionComponent } from './impression/impression.component';
import { HistoriquePaiementComponent } from './impression/historique-paiement/historique-paiement.component';
import { CaisseVersementMotifAnnulationComponent } from './caisse-versement/caisse-versement-motif-annulation/caisse-versement-motif-annulation.component';
import { PaiementComponent } from './caisse-versement/paiement/paiement.component';


const routes: Routes = [
  { path: '', component: ScolariteComponent },
  { path: 'impression', component: ImpressionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'eleves-inscrits', component: ElevesInscritComponent },
  { path: 'eleves-archive', component: ElevesArchiveComponent },
  { path: 'frais-scolarite', component: ScolarisationComponent },
  { path: 'salle-classe', component: SalleClasseComponent },
  { path: 'caisse-versement', component: CaisseVersementComponent },
  { path: 'paiement', component: PaiementComponent },
];

@NgModule({
  declarations: [
    InscriptionComponent,
    ScolariteComponent,
    SelectEleveComponent,
    ElevesInscritComponent,
    ScolarisationComponent,
    SalleClasseComponent,
    AddSalleClasseComponent,
    AddScolarisationComponent,
    CaisseVersementComponent,
    ElevesArchiveComponent,
    ImpressionComponent,
    HistoriquePaiementComponent,
    CaisseVersementMotifAnnulationComponent,PaiementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),SharedModule
  ]
})
export class ScolariteModule { }
