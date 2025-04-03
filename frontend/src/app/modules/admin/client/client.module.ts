import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { AddClientComponent } from './add-client/add-client.component';
import { ListClientComponent } from './list-client/list-client.component';
import { DetailClientComponent } from './detail-client/detail-client.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'list', component: ListClientComponent },
  { path: 'show/:client_id', component: DetailClientComponent },
];

@NgModule({
  declarations: [
    ClientComponent,
    AddClientComponent,ListClientComponent,DetailClientComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,SharedModule, TranslateModule
  ],
  providers: [TranslateService]
})
export class ClientModule { }
