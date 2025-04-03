import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepensesComponent } from './depenses.component';
import { ListeComponent } from './liste/liste.component';
import { RouterModule, Routes } from '@angular/router'; 
import { AnnulerComponent } from './annuler/annuler.component';
import { SharedModule } from 'app/shared/shared.module';
import { CategorieDepenseComponent } from './categorie-depense/categorie-depense.component';
import { AddCategorieDepenseComponent } from './categorie-depense/add-categorie-depense/add-categorie-depense.component';
import { DesignationDepenseComponent } from './designation-depense/designation-depense.component';
import { AddDesignationDepenseComponent } from './designation-depense/add-designation-depense/add-designation-depense.component';
import { AddDepenseComponent } from './add-depense/add-depense.component';
import { DepenseDetailComponent } from './depense-detail/depense-detail.component';
import { MediaAddComponent } from './depense-detail/media-add/media-add.component';


const routes: Routes = [
  { path: '', component: DepensesComponent },
  { path: 'categorie', component: CategorieDepenseComponent },
  { path: 'designation', component: DesignationDepenseComponent },
  { path: 'liste', component: ListeComponent },
  { path: 'liste/:type', component: ListeComponent },
  { path: 'add', component: AddDepenseComponent },
  { path: 'annuler', component: AnnulerComponent },
  { path: 'detail/:depense_id', component: DepenseDetailComponent },
  { path: 'media', component: MediaAddComponent },
];

@NgModule({
  declarations: [
    DepensesComponent,
    ListeComponent,AddDepenseComponent, DepenseDetailComponent, MediaAddComponent,
    AnnulerComponent,CategorieDepenseComponent,AddCategorieDepenseComponent,DesignationDepenseComponent,AddDesignationDepenseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),SharedModule
  ]
})
export class DepensesModule { }
