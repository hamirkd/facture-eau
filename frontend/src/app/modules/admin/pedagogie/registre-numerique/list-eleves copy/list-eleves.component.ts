import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';  
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { EleveMoyenne } from 'app/models/eleveMoyenne.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { SocieteService } from 'app/core/services/societe.service';
import { AddElevesComponent } from '../add-eleves/add-eleves.component';
import { _DATA_ELEVES } from './_DATA_ELEVES';
import { ElevesService } from 'app/core/services/eleves.service';

@Component({
  selector: 'app-list-eleves',
  templateUrl: './list-eleves.component.html',
  styleUrls: ['./list-eleves.component.scss'],
  animations: [
      trigger('detailExpand', [
          state('collapsed', style({ height: '0px', minHeight: '0' })),
          state('expanded', style({ height: '*' })),
          transition(
              'expanded <=> collapsed',
              animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
          ),
      ]),
  ],
})
export class ListElevesComponent  implements OnInit  , AfterViewInit{
  displayedColumns: string[] = [
      'select',
      'matricule','nom','cf','og','oe','ph','an','lv2','hg','ma','sp','svt','eps','mus','ap','edhc','cond','bonus','trim1','trim2','trim3','am',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<EleveMoyenne>(true, []);

  dataSource = new MatTableDataSource<EleveMoyenne>([]);

  dialogRef: any;
  data = _DATA_ELEVES[0];
  @ViewChild(MatTable) table: MatTable<EleveMoyenne>;

  constructor(
      private _changeDetectorRef: ChangeDetectorRef,
      private _activatedRoute: ActivatedRoute,
      private _router: Router,
      private _matDialog: MatDialog,
      private _fuseConfirmationService: FuseConfirmationService,
      private _elevesService:ElevesService
  ) {
      this.dataSource = new MatTableDataSource<EleveMoyenne>([]);
      // this._updateList();
  }
  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  ngOnInit(): void {
      this._updateList();
       
  }

  _updateList(){
      this.dataSource.data=[];
      this.dataSource.data = this._elevesService.getAll();  
        //   this.table.renderRows();
  }

  add(): void {
      this.dialogRef = this._matDialog.open(AddElevesComponent, {
          data: {
              Eleve: {},
              action: 'new',
          },
      });

      this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
          if (!response) {
              return;
          }
          this._updateList();
          
      });
  }

  toutvider() {
      this.dialogRef = this._fuseConfirmationService.open({
          title: 'Suppression de élève',
          message:
              'Voulez-vous supprimer tous les élèves de votre base de données ?',
      });
      this.dialogRef.afterClosed().subscribe((response) => {
          if (response === 'confirmed') {
              this.dataSource.data = [];
              this.table.renderRows();
          }
      });
  }

  edit(Eleve: EleveMoyenne): void {
      this.dialogRef = this._matDialog.open(AddElevesComponent, {
          data: {
              Eleve: Eleve,
              action: 'edit',
          },
      });

      this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
          if (!response) {
              return;
          }
          this._updateList();
          
      });
  }

  importerListeEleves(): void {
      
  }

  supprimer(Eleve: EleveMoyenne) {
      this.dialogRef = this._fuseConfirmationService.open({
          title: 'Suppression de élève',
          message:
              'Voulez-vous supprimer ce élève ' +
              Eleve.nom +
              ' ' +
              Eleve.prenom +
              ' ?',
      });
      this.dialogRef.afterClosed().subscribe((response) => {
          console.log(response);
          if (response === 'confirmed') {
              this._elevesService.delete(Eleve).subscribe(o=>{
                  console.log(o);
                  this._updateList();
              },err=>console.error(err));
          }
      });
  }
   /** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  if (this.isAllSelected()) {
    this.selection.clear();
    return;
  }

  this.selection.select(...this.dataSource.data);
}
supprimer_element(){
    this.dialogRef = this._fuseConfirmationService.open({
      title: 'Suppression de élève',
      message:
          'Voulez-vous supprimer les élèves sélectionner ?',
  });
  this.dialogRef.afterClosed().subscribe((response) => {
      console.log(response);
      if (response === 'confirmed') {
          
          this.selection.selected.forEach(Eleve=>{
              this.dataSource.data.splice(
                  this.dataSource.data.findIndex(
                      (s) => s.matricule == Eleve.matricule
                  ),
                  1
              );
              // this.dataSource.data = []
          })
          const tempo=JSON.parse(JSON.stringify(this.dataSource.data));
          this.dataSource.data = [];
          setTimeout(() => {
              this.dataSource.data = tempo;
          this.selection.clear();
          this.table.renderRows();
          }, 0);
      }
  });
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: EleveMoyenne): string {
  if (!row) {
    return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.matricule + 1}`;
}
}