import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalariesComponent } from './salaries.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { ShowComponent } from './show/show.component';
import { ImportComponent } from './import/import.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseCardModule } from '@fuse/components/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'add', component: AddComponent },
    { path: 'import', component: ImportComponent },
    { path: ':id', component: ShowComponent },
];

@NgModule({
    declarations: [
        SalariesComponent,
        ListComponent,
        AddComponent,
        ShowComponent,ImportComponent
    ],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      ReactiveFormsModule,
      MatTableModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatDividerModule,
      MatIconModule,
      MatMenuModule,MatPaginatorModule,MatCheckboxModule,
      MatProgressBarModule,
      MatSortModule,
      MatTableModule,
      MatTooltipModule,
      MatIconModule,
      MatMenuModule,
      MatTableModule,
      MatToolbarModule,
      FuseCardModule,
      MatTableModule,
      MatButtonModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatAutocompleteModule, 
      MatIconModule,
      MatInputModule,
      MatMenuModule,
      MatDialogModule,
      MatRippleModule,
      MatTableModule,
      MatToolbarModule,
      MatOptionModule,
      MatSelectModule,
      MatTableModule,
      MatTabsModule,
      MatAutocompleteModule,
    ],
})
export class SalariesModule {}
