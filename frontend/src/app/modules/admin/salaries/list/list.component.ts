import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AddComponent } from '../add/add.component';
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
import { _DATA_SOCIETE } from '../../societes/list/_data';
import { ImportComponent } from '../import/import.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Salarie } from 'app/models/salarie.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { SalarieService } from 'app/core/services/salarie.service';
import { SocieteService } from 'app/core/services/societe.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
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
export class ListComponent implements OnInit  , AfterViewInit{
    displayedColumns: string[] = [
        'select',
        'matricule',
        'nif',
        'nom',
        'prenom',
        'emploi_occupe',
        'dateembauche',
        'actions',
    ];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    selection = new SelectionModel<Salarie>(true, []);

    dataSource = new MatTableDataSource<Salarie>([]);

    dialogRef: any;
    data = _DATA_SOCIETE[0];
    @ViewChild(MatTable) table: MatTable<Salarie>;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _matDialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService,
        private _salarieService:SalarieService,
        private _societeService:SocieteService
    ) {
        this.dataSource = new MatTableDataSource<Salarie>([]);
        // this._updateList();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
      }
    ngOnInit(): void {
        this._updateList();
        
        this.data = this._societeService.activeSociete;
    }

    _updateList(){
        this.dataSource.data=[];
        this._salarieService.getAllByCurrentSociete().subscribe(data=>{
            this.dataSource.data=data;
            this.table.renderRows();
        },err=>{
            this.dataSource.data=[];
            this.table.renderRows();
        })
    }

    add(): void {
        this.dialogRef = this._matDialog.open(AddComponent, {
            data: {
                salarie: {},
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
            title: 'Suppression de salarié',
            message:
                'Voulez-vous supprimer tous les salariés de votre base de données ?',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (response === 'confirmed') {
                this.dataSource.data = [];
                this.table.renderRows();
            }
        });
    }

    edit(salarie: Salarie): void {
        this.dialogRef = this._matDialog.open(AddComponent, {
            data: {
                salarie: salarie,
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

    importerListeSalaries(): void {
        this.dialogRef = this._matDialog.open(ImportComponent, {
            data: this.data,
        });

        this.dialogRef.afterClosed().subscribe((salaries) => {
            if (!salaries) {
                return;
            }
            this.dataSource.data = salaries;
            // this.data.rubriques = response.rubriques;
        });
    }

    supprimer(salarie: Salarie) {
        this.dialogRef = this._fuseConfirmationService.open({
            title: 'Suppression de salarié',
            message:
                'Voulez-vous supprimer ce salarié ' +
                salarie.nom +
                ' ' +
                salarie.prenom +
                ' ?',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            console.log(response);
            if (response === 'confirmed') {
                this._salarieService.delete(salarie).subscribe(o=>{
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
        title: 'Suppression de salarié',
        message:
            'Voulez-vous supprimer les salariés sélectionner ?',
    });
    this.dialogRef.afterClosed().subscribe((response) => {
        console.log(response);
        if (response === 'confirmed') {
            
            this.selection.selected.forEach(salarie=>{
                this.dataSource.data.splice(
                    this.dataSource.data.findIndex(
                        (s) => s.matricule == salarie.matricule
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
  checkboxLabel(row?: Salarie): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.matricule + 1}`;
  }
}
