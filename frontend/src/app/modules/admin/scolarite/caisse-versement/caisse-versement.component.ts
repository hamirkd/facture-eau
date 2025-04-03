import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AnneeService } from 'app/core/services/annee.service';
import { VersementsService } from 'app/core/services/versements.service';
import { UserService } from 'app/core/user/user.service';
import { Versement } from 'app/models/versement.model';
import moment from 'moment';
import { _droit } from '../../DROIT_USER_MODULE';
import { CaisseVersementMotifAnnulationComponent } from './caisse-versement-motif-annulation/caisse-versement-motif-annulation.component';
import { PaiementComponent } from './paiement/paiement.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import FileSaver from 'file-saver';

@Component({
    selector: 'app-caisse-versement',
    templateUrl: './caisse-versement.component.html',
    styleUrls: ['./caisse-versement.component.scss'],
})
export class CaisseVersementComponent implements OnInit {
    constructor(
        private _anneeService: AnneeService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _matDialog: MatDialog,
        private caisseVersementService: VersementsService,
        private _snackBar: MatSnackBar,
        private _userService: UserService
    ) {
        this._userService.user$.subscribe((data) => {
            this.user = data;
            console.log(this.user);
        });
    }
    _droit = _droit;

    dialogRef: any;
    actualiser = {};
    user: {};
    searchControl: FormControl = new FormControl();
    datedebutControl: FormControl = new FormControl();
    datefinControl: FormControl = new FormControl();
    datedebut = moment().day(1).format('YYYY-MM-DD');
    datefin = moment().day(7).format('YYYY-MM-DD');

    versements: Versement[] = [];
    dataSource: MatTableDataSource<Versement> = new MatTableDataSource();

    displayedColumns: string[] = [
        'id',
        'inscription_id',
        'eleve_id',
        'montant',
        'dateversement',
        'created_by',
        'actions',
    ];

    recherche(textRecherche) {
        textRecherche = textRecherche.trim(); // Remove whitespace
        textRecherche = textRecherche.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = textRecherche;
    }
    ngOnInit(): void {
        this._updateDataSource();
    }
    _updateDataSource() {
        this.caisseVersementService
            .getVersementByAnneeOrAll({
                annee_id: this._anneeService.activeAnnee.id,
                datedebut: this.datedebut,
                datefin: this.datefin,
            })
            .subscribe((data) => {
                this.versements = data as Versement[]; 
                this.dataSource.data = this.versements;
                console.log(data)
            });
    }
    rechercherButton() {
        this.actualiser['btn1'] = true;
        this._updateDataSource();
        this.actualiser['btn1'] = false;
    }
    restorer(element: Versement) {
        this.dialogRef = this._fuseConfirmationService.open({
            title: 'Resturation de versement',
            message:
                'Voulez-vous restaurer le versement N ' + element.id + ' ?',
        });

        this.dialogRef.afterClosed().subscribe((response) => {
            if (response === 'confirmed') {
                //***Restaure */
                this.caisseVersementService
                    .restore({id:element.id})
                    .subscribe((data) => {
                        console.log(data);
                        this._updateDataSource();
                    });
            }
        });
    }
    annuler(element: Versement) {
        this.dialogRef = this._matDialog.open(
            CaisseVersementMotifAnnulationComponent,
            {
                data: {
                    id: element.id,
                },
            }
        );

        this.dialogRef.afterClosed().subscribe((response: any) => {
            if (!response) {
                return;
            }
            console.log(response);
            this.caisseVersementService.cancelle(response).subscribe(
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

    supprimer(element: Versement) {
        this.dialogRef = this._fuseConfirmationService.open({
            title: 'Suppression de versement',
            message:
                'Voulez-vous supprimer le versement N ' + element.id + ' ?',
        });
        console.log(this.user);

        this.dialogRef.afterClosed().subscribe((response) => {
            if (response === 'confirmed') {
                //***DELETE ONE */
                this.caisseVersementService
                    .delete(element)
                    .subscribe((data) => {
                        console.log(data);
                        this._updateDataSource();
                    });
            }
        });
    }
    ajouter(){
        this.dialogRef = this._matDialog.open(
            PaiementComponent,
            {
                data: {
                    versement: {},
                },
            }
        );

        this.dialogRef.afterClosed().subscribe((response: any) => {
            if (!response) {
                return;
            } 
                    this._updateDataSource();
                    
        });
    }
    
    exporter(){
        if(!this.versements||this.versements.length==0){
        
            this._snackBar.open('Veuillez revoir les données', 'Splash', {
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration:2000
                });
        return;
        }
        let listeAImprimer: {matricule,nomprenom,montant,dateversement}[]=[];
        this.versements.forEach(o=>listeAImprimer.push({matricule:o['matricule'],nomprenom:o['nomprenom'],
        montant:o['montant'],dateversement:o['dateversement']}));
  
        var blob = new Blob([this.convertToCSV(listeAImprimer)], {type: "text/csv;charset=utf-8"});
        FileSaver.saveAs(blob,"paiement-liste.csv");
    }

    convertToCSV(arr) {
        arr.forEach(item=>{
            Object.keys(arr[0]).forEach(champ => {
                item[champ]=item[champ]?item[champ].toString().trim():item[champ]
              });
          })
          const array = [Object.keys(arr[0])].concat(arr)
          return array.map(it => {
              return Object.values(it).join(';').toString()
          }).join('\n')
      }
}
