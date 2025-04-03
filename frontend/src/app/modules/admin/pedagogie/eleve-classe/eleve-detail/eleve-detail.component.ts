import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AnneeService } from 'app/core/services/annee.service';
import { BulletinService } from 'app/core/services/bulletin.service';
import { ElevesService } from 'app/core/services/eleves.service';
import { VersementsService } from 'app/core/services/versements.service';
import { Bulletin } from 'app/models/bulletin.model';
import { Eleve } from 'app/models/eleve.model';
import { Versement } from 'app/models/versement.model';
import { CaisseVersementMotifAnnulationComponent } from 'app/modules/admin/scolarite/caisse-versement/caisse-versement-motif-annulation/caisse-versement-motif-annulation.component';
import { saveAs } from 'file-saver';
import { EleveEditComponent } from './eleve-edit/eleve-edit.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { Inscription } from 'app/models/inscription.model';
import { InscriptionsService } from 'app/core/services/inscriptions.service';
import { PaiementComponent } from 'app/modules/admin/scolarite/caisse-versement/paiement/paiement.component';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'environments/environment';
import { Media } from 'app/models/media.model';
import { MediaAddComponent } from 'app/modules/admin/depenses/depense-detail/media-add/media-add.component';
import { MediaService } from 'app/core/services/media.service';
import { BulletinMoyenneService } from 'app/core/services/bulletin-moyenne.service';

@Component({
    selector: 'app-eleve-detail',
    templateUrl: './eleve-detail.component.html',
    styleUrls: ['./eleve-detail.component.scss'],
})
export class EleveDetailComponent implements OnInit {
    @ViewChild('supportNgForm') supportNgForm: NgForm;
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    displayedColumns: string[] = [
        'trimestre',
        'moyenne',
        'rang',
        'moyenne',
        'created_at',
        'actions',
    ];
    bulletinDataSearch: { annee_id; eleve_id; trimestre }; //{inscription_id,annee_id}={}
    eleve: Eleve = new Eleve({});
    bulletin: any = {};
    data = {};
    eleve_id;
    dialogRef: any;
    editMode: boolean = false;
    userAvatarForm = new FormControl('');

    dataSource: MatTableDataSource<{}> = new MatTableDataSource();
    dataSourceDocument: MatTableDataSource<{}> = new MatTableDataSource();
    displayedColumnsDocument: string[] = [
        // 'type_documents',
        'no',
        'libelle_document',
        'created_at',
        'actions',
    ];
    dataSourceversement: MatTableDataSource<Versement> =
        new MatTableDataSource();
    token;
    urlForBackend;
    displayedColumnsversement: string[] = [
        'id',
        'montant',
        'createdAt',
        'actions',
    ];
    inscription: Inscription = new Inscription({});
    constructor(
        private _bulletinService: BulletinService,
        private _bulletinMoyenneService: BulletinMoyenneService,
        private _eleveService: ElevesService,
        private route: ActivatedRoute,
        private _matDialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService,
        private _versementService: VersementsService,
        private _snackBar: MatSnackBar,
        private _anneeScolaire: AnneeService,
        private _inscriptionService: InscriptionsService,
        private _authService: AuthService,
        private _mediaService: MediaService
    ) {
        this.token = this._authService.accessToken;
        this.urlForBackend = environment.urlApi;
        this.bulletinDataSearch;
        route.params.subscribe((d) => {
            this.eleve_id = Number(d.eleve_id);
            this.getHistoriqueVersement();
            this._inscriptionService
                .getInscriptionByEleveAndAnnee({
                    annee_id: this._anneeScolaire.activeAnnee.id,
                    eleve_id: d.eleve_id,
                })
                .subscribe((data) => {
                    this.inscription = data;
                });
        });
    }

    ngOnInit(): void {
        this._updateDataSource();
        this._updateDataSourceDocument();
    }
    _updateDataSource() {
        this._bulletinService
            .getAllBulletinByAnneeScolaireEleve({
                eleve_id: this.eleve_id,
                annee_id: this._anneeScolaire.activeAnnee.id,
            })
            .subscribe(
                (data) => {
                    console.log(data);
                    this.dataSource.data = data['bulletins'];
                    this.eleve = data['eleve'];
                },
                (err) => {
                    console.log(err);
                    if (err.error.data && err.error.data['eleve'])
                        this.eleve = err.error.data['eleve'];
                    // this.eleve = err.data['eleve'];

                    this._snackBar.open(err.error.message, 'Splash', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        duration: 2000,
                    });
                }
            );
    }
    supprimer(bulletin) {
        this._bulletinService
            .deleteAllInformationOfBulletin(bulletin)
            .subscribe(
                (d) => {
                    console.log(d);
                    this._updateDataSource();
                },
                (err) => {
                    console.log(err);
                }
            );
    }

    editer(): void {
        this.dialogRef = this._matDialog.open(EleveEditComponent, {
            panelClass: '',
            data: {
                eleve: this.eleve,
            },
        });

        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }

            this._updateDataSource();
        });
    }

    addVersement(): void {
        this.dialogRef = this._matDialog.open(PaiementComponent, {
            panelClass: '',
            data: {
                versement: {
                    inscription_id: this.inscription.id,
                    classe_id: this.inscription.classe_id,
                },
            },
        });

        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }

            this.getHistoriqueVersement();
        });
    }
    toggleEditMode() {
        this.editMode = !this.editMode;
    }

    /**
     * Remove the avatar
     */
    removeAvatar(): void {
        // Get the form control for 'avatar'
        const avatarFormControl = this.userAvatarForm.get('avatar');

        // Set the avatar as null
        //  avatarFormControl.setValue(null);

        // Set the file input value as null
        //  this._avatarFileInput.nativeElement.value = null;

        // Upload the avatar
        this.eleve.file_name = null;
        this._eleveService.removeAvatar(this.eleve_id).subscribe((data) => {
            console.log(data);
            this.eleve = data;
        });
        // Update the contact
        //  this.eleve.avatar = null;
    }

    uploadAvatar(fileList: FileList): void {
        // Return if canceled
        if (!fileList.length) {
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];

        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            return;
        }

        // Upload the avatar
        this.eleve.file_name = null;
        this._eleveService
            .uploadAvatar(this.eleve_id + '', file)
            .subscribe((data) => {
                // this._updateDataSource();
                this.eleve = data;
                console.log(this.eleve);
            });
    }
    montant_scolarite;
    montant_verse;
    getHistoriqueVersement() {
        this._versementService
            .getEleveDetailVersementByAnneeAndEleve({
                eleve_id: this.eleve_id,
                annee_id: this._anneeScolaire.activeAnnee.id,
            })
            .subscribe(
                (data) => {
                    this.dataSourceversement.data = data[
                        'versements'
                    ] as Versement[];
                    this.montant_scolarite = data['montant_scolarite'];
                    this.montant_verse = data['montant_verse'];
                },
                (err) => {
                    this.dataSourceversement.data = [];
                    console.log(err);
                }
            );
    }

    restorer(element: Versement) {
        this.dialogRef = this._fuseConfirmationService.open({
            title: 'Restauration de versement',
            message:
                'Voulez-vous restaurer le versement N ' + element.id + ' ?',
        });

        this.dialogRef.afterClosed().subscribe((response) => {
            if (response === 'confirmed') {
                //***Restaure */
                this._versementService
                    .restore({ id: element.id })
                    .subscribe((data) => {
                        console.log(data);
                        this.getHistoriqueVersement();
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
            this._versementService.cancelle(response).subscribe(
                (d) => {
                    this.getHistoriqueVersement();
                    console.log(d);
                },
                (err) => {
                    console.log(err);
                }
            );
        });
    }

    supprimer2(element: Versement) {
        this.dialogRef = this._fuseConfirmationService.open({
            title: 'Suppression de versement',
            message:
                'Voulez-vous supprimer le versement N ' + element.id + ' ?',
        });

        this.dialogRef.afterClosed().subscribe((response) => {
            if (response === 'confirmed') {
                //***DELETE ONE */
                this._versementService.delete(element).subscribe((data) => {
                    console.log(data);
                    this.getHistoriqueVersement();
                });
            }
        });
    }
    _updateDataSourceDocument() {
        this._mediaService
            .getMediaByTypeAndId({
                type_documents: 'DOSSIERS_ELEVES',
                parent_id: this.eleve_id,
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
                    type_documents: 'DOSSIERS_ELEVES',
                    parent_id: this.eleve_id,
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

    public downloadInvoice() {
        // https://github.com/MaxwellADN/jspdf-invoice-template/blob/master/src/app/app.component.ts#L12
        const doc = new jsPDF('p', 'mm', 'a5');

        autoTable(doc, {
            body: [
                [
                    {
                        content: 'Reçu',
                        styles: {
                            halign: 'right',
                            fontSize: 20,
                        },
                    },
                ],
            ],
            theme: 'plain',
            styles: {},
        });
        var img = new Image();
        img.src = 'assets/images/logo/logo.png';
        doc.addImage(img, 'jpeg', 15, 5, 25, 25);

        autoTable(doc, {
            body: [
                [
                    {
                        content:
                            `Élève : #${this.eleve.matricule}` +
                            `\nNom et Prénom(s) : ${this.eleve.nom} ${this.eleve.prenom}` +
                            `\nClasse : ${this.inscription.salle_classe.libelle}`,
                        styles: {
                            halign: 'left',
                            lineColor: '#0000000',
                            lineWidth: 0.1,
                        },
                    },
                    {
                        content:
                            `Référence : #${this.eleve_id
                                .toString()
                                .padStart(6, '0')}` +
                            `\nDate : ${moment(new Date()).format(
                                'DD/MM/YYYY'
                            )}`,
                        styles: {
                            halign: 'right',
                            lineColor: '#0000000',
                            lineWidth: 0.1,
                        },
                    },
                ],
            ],
            theme: 'plain',
        });

        autoTable(doc, {
            body: [
                [
                    {
                        content: 'Paiement de frais de scolarité',
                        styles: {
                            halign: 'left',
                            fontSize: 14,
                        },
                    },
                ],
            ],
            theme: 'plain',
        });
        let data = [];

        let somme = 0;
        for (let element of this.dataSourceversement.data) {
            somme = somme + element.montant;
            data.push([
                '#' + element.id.toString().padStart(6, '0'),
                'Frais inscription & Scolarité',
                moment(element.created_at).format('DD/MM/YYYY'),
                element.montant,
            ]);
        }
        const restpaye = this.montant_scolarite - this.montant_verse;

        autoTable(doc, {
            head: [['Réf.', 'Description', 'Date', 'Montant']],
            body: data,
            theme: 'grid',
            headStyles: {
                fillColor: '#343a40',
            },
        });

        autoTable(doc, {
            body: [
                [
                    {
                        content: 'Total payé : ',
                        styles: {
                            halign: 'right',
                            fontSize: 14,
                        },
                    },
                    {
                        content: `${this.montant_verse} F. CFA`,
                        styles: {
                            halign: 'right',
                            fontSize: 14,
                            fontStyle: 'bold',
                        },
                    },
                ],
                [
                    {
                        content: 'Reste à payer : ',
                        styles: {
                            halign: 'right',
                            fontSize: 14,
                        },
                    },
                    {
                        content: `${restpaye} F. CFA`,
                        styles: {
                            fontSize: 14,
                            halign: 'right',
                        },
                    },
                ],
            ],
            theme: 'plain',
        });

        autoTable(doc, {
            body: [
                [
                    {
                        content: 'Termes et remarques',
                        styles: {
                            halign: 'left',
                            fontSize: 14,
                        },
                    },
                ],
                [
                    {
                        content: 'Toute somme versée ne sera plus remboursable',
                        styles: {
                            halign: 'left',
                        },
                    },
                ],
            ],
            theme: 'plain',
        });

        return doc.save('invoice');
    }
 
        imprimerBulletin(bulletin){
            
            this.data['actualiser2'+bulletin.id] = true;
            this._bulletinMoyenneService.telechargerUnBulletin(
              {bulletin_id:bulletin.id}).subscribe(data=>{
                saveAs(data,`BULLETIN_${bulletin.annee_id}${bulletin.trimestre}${bulletin.eleve_id}.pdf`);
                this.data['actualiser2'+bulletin.id] = false;
              },err=>{      
                this.data['actualiser2'+bulletin.id] = false;
                console.log(err) 
                this._snackBar.open(err.error.message, 'Splash', {
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  duration:2000
                  });
              })
          }
}
