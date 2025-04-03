import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UserService } from 'app/core/user/user.service';
import moment from 'moment';
import { _droit } from '../../DROIT_USER_MODULE';
import { MatSnackBar } from '@angular/material/snack-bar';
import FileSaver from 'file-saver';
import { FactureMotifAnnulationComponent } from './facture-motif-annulation/facture-motif-annulation.component';
import { FactureService } from 'app/core/services/facture.service';
import { Facture } from 'app/models/facture.model';

@Component({
    selector: 'app-facture',
    templateUrl: './facture.component.html',
    styleUrls: ['./facture.component.scss'],
})
export class FactureComponent implements OnInit {
    constructor(
        private _fuseConfirmationService: FuseConfirmationService,
        private _matDialog: MatDialog,
        private factureService: FactureService,
        private _snackBar: MatSnackBar,
        private _userService: UserService
    ) {
        this._userService.user$.subscribe((data) => {
            this.user = data;
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

    factures: Facture[] = [];
    dataSource: MatTableDataSource<Facture> = new MatTableDataSource();

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
        this.factureService
            .findBy({
                datedebut: this.datedebut,
                datefin: this.datefin,
            })
            .subscribe((data) => {
                this.factures = data as Facture[]; 
                this.dataSource.data = this.factures;
                console.log(data)
            });
    }
    rechercherButton() {
        this.actualiser['btn1'] = true;
        this._updateDataSource();
        this.actualiser['btn1'] = false;
    }
    restorer(element: Facture) {
        this.dialogRef = this._fuseConfirmationService.open({
            title: 'Resturation de facture',
            message:
                'Voulez-vous restaurer la facture N ' + element.id + ' ?',
        });

        this.dialogRef.afterClosed().subscribe((response) => {
            if (response === 'confirmed') {
                //***Restaure */
                this.factureService
                    .restore({id:element.id})
                    .subscribe((data) => {
                        console.log(data);
                        this._updateDataSource();
                    });
            }
        });
    }
    annuler(element: Facture) {
        this.dialogRef = this._matDialog.open(
            FactureMotifAnnulationComponent,
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
            this.factureService.cancelle(response).subscribe(
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

    supprimer(element: Facture) {
        this.dialogRef = this._fuseConfirmationService.open({
            title: 'Suppression de versement',
            message:
                'Voulez-vous supprimer le versement N ' + element.id + ' ?',
        });
        console.log(this.user);

        this.dialogRef.afterClosed().subscribe((response) => {
            if (response === 'confirmed') {
                //***DELETE ONE */
                this.factureService
                    .delete(element)
                    .subscribe((data) => {
                        console.log(data);
                        this._updateDataSource();
                    });
            }
        });
    }
    ajouter(){
        // this.dialogRef = this._matDialog.open(
        //     PaiementComponent,
        //     {
        //         data: {
        //             versement: {},
        //         },
        //     }
        // );

        this.dialogRef.afterClosed().subscribe((response: any) => {
            if (!response) {
                return;
            } 
                    this._updateDataSource();
                    
        });
    }
    
    exporter(){
        if(!this.factures||this.factures.length==0){
        
            this._snackBar.open('Veuillez revoir les données', 'Splash', {
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration:2000
                });
        return;
        }
        let listeAImprimer: {matricule,nomprenom,montant,dateversement}[]=[];
        this.factures.forEach(o=>listeAImprimer.push({matricule:o['matricule'],nomprenom:o['nomprenom'],
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
