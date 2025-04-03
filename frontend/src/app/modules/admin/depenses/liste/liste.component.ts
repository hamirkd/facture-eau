import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AnneeService } from 'app/core/services/annee.service';
import { DepenseService } from 'app/core/services/depense.service';
import { UserService } from 'app/core/user/user.service';
import { Depense } from 'app/models/depense.model';
import moment from 'moment';
import { _droit } from '../../DROIT_USER_MODULE';
import { AddDepenseComponent } from '../add-depense/add-depense.component';
import { AnnulerComponent } from '../annuler/annuler.component';

@Component({
    selector: 'app-liste',
    templateUrl: './liste.component.html',
    styleUrls: ['./liste.component.scss'],
})
export class ListeComponent implements OnInit {
    constructor(
        route: ActivatedRoute,
        private _fuseConfirmationService: FuseConfirmationService,
        private _matDialog: MatDialog,
        private _depenseService: DepenseService,
        private _userService: UserService
    ) {
        this._userService.user$.subscribe((data) => {
            this.user = data;
        });
        route.params.subscribe((d) => {
            this.type = d.type;
            switch (this.type) {
                case 'year':
                this.datedebut = null;
                this.datefin = null;
                    break;
                case 'month':
                this.datedebut= moment().date(1).format('YYYY-MM-DD');
                this.datefin = moment().add(1,'M').date(1).add(-1,'day').format('YYYY-MM-DD');
                    break;
                case 'month_3last':
                this.datedebut= moment().add(-2,'M').date(1).format('YYYY-MM-DD');
                this.datefin = moment().add(1,'M').date(1).add(-1,'day').format('YYYY-MM-DD');
                    break;
                case 'week':
                    
                this.datedebut = moment().day(1).format('YYYY-MM-DD');
                this.datefin = moment().day(7).format('YYYY-MM-DD');
                    break;

                default:
                    
                this.datedebut = moment().day(1).format('YYYY-MM-DD');
                this.datefin = moment().day(7).format('YYYY-MM-DD');
                    break;
            }
            this._updateDataSource();
        },err=>{
            this._updateDataSource();});
    }

    type: '' | 'year' | 'month_3last' | 'month' | 'week' | null;
    _droit = _droit;

    dialogRef: any;
    actualiser = {};
    user: {};
    searchControl: FormControl = new FormControl();
    datedebutControl: FormControl = new FormControl();
    datefinControl: FormControl = new FormControl();
    datedebut = moment().day(1).format('YYYY-MM-DD');
    datefin = moment().day(7).format('YYYY-MM-DD');

    depenses: Depense[] = [];
    dataSource: MatTableDataSource<Depense> = new MatTableDataSource();

    displayedColumns: string[] = [
        'id',
        'categorie',
        'designation',
        'description',
        'montant',
        'datedepense',
        'actions',
    ];

    recherche(textRecherche) {
        textRecherche = textRecherche.trim(); // Remove whitespace
        textRecherche = textRecherche.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = textRecherche;
    }
    ngOnInit(): void {
    }
    _updateDataSource() {
        this._depenseService
            .getDepenseByBetweenTwoDate({
                datedebut: this.datedebut,
                datefin: this.datefin,
            })
            .subscribe((data) => {
                this.depenses = data as Depense[];
                this.dataSource.data = this.depenses; 
            });
    }
    rechercherButton() {
        this.actualiser['btn1'] = true;
        this._updateDataSource();
        this.actualiser['btn1'] = false;
    }
    restorer(element: Depense) {
        this.dialogRef = this._fuseConfirmationService.open({
            title: 'Restauration de dépense',
            message: 'Voulez-vous restaurer la dépense N ' + element.id + ' ?',
        });

        this.dialogRef.afterClosed().subscribe((response) => {
            if (response === 'confirmed') {
                //***Restaure */
                this._depenseService
                    .restore({ id: element.id })
                    .subscribe((data) => {
                        console.log(data);
                        this._updateDataSource();
                    });
            }
        });
    }

    editer(depense): void {
        this.dialogRef = this._matDialog.open(AddDepenseComponent, {
            panelClass: '',
            data: {
                depense: depense,
                action: 'edit',
            },
        });

        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }

            this._updateDataSource();
        });
    }

    ajouter(): void {
        this.dialogRef = this._matDialog.open(AddDepenseComponent, {
            panelClass: '',
            data: {
                depense: {},
                action: 'new',
            },
        });

        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }

            this._updateDataSource();
        });
    }

    annuler(element: Depense) {
        this.dialogRef = this._matDialog.open(AnnulerComponent, {
            data: {
                id: element.id,
            },
        });

        this.dialogRef.afterClosed().subscribe((response: any) => {
            if (!response) {
                return;
            }
            console.log(response);
            this._depenseService.cancelle(response).subscribe(
                (d) => {
                    this._updateDataSource();
                    console.log(d);
                },
                (err) => {
                    console.log(err);
                }
            );
        });
    }

    supprimer(element: Depense) {
        this.dialogRef = this._fuseConfirmationService.open({
            title: 'Suppression de depense',
            message: 'Voulez-vous supprimer le depense N ' + element.id + ' ?',
        });

        this.dialogRef.afterClosed().subscribe((response) => {
            if (response === 'confirmed') {
                //***DELETE ONE */
                this._depenseService.delete(element).subscribe((data) => {
                    console.log(data);
                    this._updateDataSource();
                });
            }
        });
    }
}
