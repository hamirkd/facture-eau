import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AnneeService } from 'app/core/services/annee.service';
import { saveAs } from 'file-saver';
import { AuthService } from 'app/core/auth/auth.service';
import { Media } from 'app/models/media.model';
import { MediaAddComponent } from 'app/modules/admin/depenses/depense-detail/media-add/media-add.component';
import { MediaService } from 'app/core/services/media.service';
import { ContratService } from 'app/core/services/contrat.service';
import { Contrat } from 'app/models/contrat.model';
import { AddContratComponent } from '../add-contrat/add-contrat.component';
import { RuptureContratComponent } from '../rupture-contrat/rupture-contrat.component';

@Component({
    selector: 'app-detail-contrat',
    templateUrl: './detail-contrat.component.html',
    styleUrls: ['./detail-contrat.component.scss'],
})
export class DetailContratComponent implements OnInit {
    @ViewChild('supportNgForm') supportNgForm: NgForm;
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;

    contrat: Contrat = new Contrat({});

    data = {};
    contrat_id;
    dialogRef: any;
    dataSourceDocument: MatTableDataSource<{}> = new MatTableDataSource();

    dataSourceContrat: MatTableDataSource<any> =
        new MatTableDataSource();
    token;
    urlForBackend;
    displayedColumnsDocument: string[] = [
        // 'type_documents',
        'no',
        'libelle_document',
        'created_at',
        'actions',
    ];
    constructor(
        private _contratService: ContratService,
        private route: ActivatedRoute,
        private _matDialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService,
        private _snackBar: MatSnackBar,
        private _anneeScolaire: AnneeService,
        private _authService: AuthService,
        private _mediaService: MediaService
    ) {
        this.token = this._authService.accessToken;
        route.params.subscribe((d) => {
            this.contrat_id = Number(d.contrat_id);
        });
    }

    ngOnInit(): void {
        this._contratService.get(this.contrat_id).subscribe(data => {
            this.contrat = new Contrat(data);
        })
        this._updateDataSource();
        this._updateDataSourceDocument();
    }
    _updateDataSource() {

    }



    editer() {
        this.dialogRef = this._matDialog.open(AddContratComponent, {
            panelClass: '',
            data: {
                contrat: new Contrat(this.contrat),
                action: 'update'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }

                this._updateDataSource();
            });
    }
    generer() {
        this._contratService.genererToUrl(this.contrat_id);return;
    }
    rompre() {
        this.dialogRef = this._matDialog.open(RuptureContratComponent, {
            panelClass: '',
            data: {
                contrat: new Contrat(this.contrat),
                action: 'update'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }

                this._updateDataSource();
            });
    }





    supprimerContrat(element) {
        this.dialogRef = this._fuseConfirmationService.open({
            title: 'Suppression de contrat',
            message:
                'Voulez-vous supprimer le contrat N ' + element.id + ' ?',
        });

        this.dialogRef.afterClosed().subscribe((response) => {
            if (response === 'confirmed') {
                //***DELETE ONE */
                // this._contratService.delete(element).subscribe((data) => {
                // });
            }
        });
    }
    _updateDataSourceDocument() {
        this._mediaService
            .getMediaByTypeAndId({
                type_documents: 'DOSSIERS_CONTRATS',
                parent_id: this.contrat_id,
            })
            .subscribe((d) => {
                this.dataSourceDocument.data = d as Media[];
            });
    }
    addDocument(): void {
        this.dialogRef = this._matDialog.open(MediaAddComponent, {
            panelClass: '',
            data: {
                media: {
                    type_documents: 'DOSSIERS_CONTRATS',
                    parent_id: this.contrat_id,
                },
            },
        });

        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }

            this._updateDataSourceDocument();
        });
    }

    supprimerDocument(element: Media) {
        this.dialogRef = this._fuseConfirmationService.open({
            title: 'Suppression de document',
            message: 'Voulez-vous supprimer le document N ' + element.id + ' ?',
        });

        this.dialogRef.afterClosed().subscribe((response) => {
            if (response === 'confirmed') {
                //***DELETE ONE */
                this._mediaService.delete(element).subscribe((data) => {
                    console.log(data);
                    this._updateDataSourceDocument();
                });
            }
        });
    }

    imprimerDocument(element: Media) {
        this.data['btno' + element.id] = true;
        this._mediaService.getDocument(element.id).subscribe(
            (data) => {
                console.log(data);
                let ext = '';
                if (element.file_name.lastIndexOf('.') >= 0)
                    element.file_name.substring(
                        element.file_name.lastIndexOf('.')
                    );
                saveAs(data, element.libelle_document + ext);
                this.data['btno' + element.id] = false;
                this._snackBar.open('Téléchargement terminé', 'Splash', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    duration: 2000,
                });
            },
            (err) => {
                this.data['btno' + element.id] = false;
            }
        );
    }


}
