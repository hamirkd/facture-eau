import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AnneeService } from 'app/core/services/annee.service';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'environments/environment';
import { Media } from 'app/models/media.model';
import { MediaAddComponent } from 'app/modules/admin/depenses/depense-detail/media-add/media-add.component';
import { MediaService } from 'app/core/services/media.service';
import { PersonnelService } from 'app/core/services/personnel.service';
import { Personnel } from 'app/models/personnel.model';
import { AddPersonnelComponent } from '../add-personnel/add-personnel.component';
import { AddContratComponent } from '../../contrat/add-contrat/add-contrat.component';
import { Contrat } from 'app/models/contrat.model';
import { ContratService } from 'app/core/services/contrat.service';

@Component({
    selector: 'app-detail-personnel',
    templateUrl: './detail-personnel.component.html',
    styleUrls: ['./detail-personnel.component.scss'],
})
export class DetailPersonnelComponent implements OnInit {
    @ViewChild('supportNgForm') supportNgForm: NgForm;
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    displayedColumnsCarriere: string[] = [
        'categorie',
        'echelon',
        'datedebut',
        'actions',
    ];
    bulletinDataSearch: { annee_id; personnel_id; trimestre }; //{inscription_id,annee_id}={}
    personnel: Personnel = new Personnel({});
    bulletin: any = {};
    data = {};
    personnel_id;
    dialogRef: any;
    editMode: boolean = false;
    userAvatarForm = new FormControl('');

    dataSourceCarriere: MatTableDataSource<{}> = new MatTableDataSource();
    dataSourceDocument: MatTableDataSource<{}> = new MatTableDataSource();
    displayedColumnsDocument: string[] = [
        // 'type_documents',
        'no',
        'libelle_document',
        'created_at',
        'actions',
    ];
    dataSourceContrat: MatTableDataSource<any> =
        new MatTableDataSource();
    token;
    urlForBackend;
    displayedColumnsContrat: string[] = [
        'id',
        'numerocontrat',
        'datedebut',
        'datefin',
        'actions',
    ];
    constructor(
        private _personnelService: PersonnelService,
        private route: ActivatedRoute,
        private _matDialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService,
        private _snackBar: MatSnackBar,
        private _anneeScolaire: AnneeService,
        private _authService: AuthService,
        private _mediaService: MediaService,
        private contratService:ContratService
    ) {
        this.token = this._authService.accessToken;
        this.urlForBackend = environment.urlApi;
        this.bulletinDataSearch;
        route.params.subscribe((d) => {
            console.log(d)
            this.personnel_id = Number(d.personnel_id);
        });
    }

    ngOnInit(): void {
        this._updateDataSource();
        this._updateDataSourceDocument();
    }
    _updateDataSource() {
        this._personnelService.get(this.personnel_id).subscribe(data=>{
            this.personnel = new Personnel(data);
        });
        this._updateDataSourceContrat();
    }
    supprimer(contrat) {
      
    }

    addContrat(): void {
        this.dialogRef = this._matDialog.open(AddContratComponent, {
            panelClass: '',
            data      : {
                contrat:{
                    personnel_id: this.personnel.id
                },
                action: 'new'
            } 
        });
  
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }
                
                this._updateDataSource();
            });

      
    }
    // A Optimiser
    _updateDataSourceContrat(){
        this.contratService.getAlls().subscribe(data=>{
            this.dataSourceContrat.data = data as Contrat[];
            this.dataSourceContrat.data = this.dataSourceContrat.data.filter((co:Contrat)=>co.personnel_id==this.personnel_id);
            this.dataSourceContrat.data.forEach(contrat=>{
                contrat['nomprenom'] = contrat?.personnel?.nom +" "+contrat?.personnel?.prenom
            })
        })
    }

    
    editer(){
        this.dialogRef = this._matDialog.open(AddPersonnelComponent, {
          panelClass: 'w-full',
          data      : {
              personnel:new Personnel(this.personnel),
              action: 'update'
          } 
      });
  
      this.dialogRef.afterClosed()
          .subscribe((response: FormGroup) => {
              if ( !response )
              {
                  return;
              }
              
              this._updateDataSource();
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
        this.personnel.file_name = null;
        this._personnelService.removeAvatar(this.personnel_id).subscribe((data) => {
            console.log(data);
            this.personnel = data;
        });
        // Update the contact
        //  this.personnel.avatar = null;
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
        this.personnel.file_name = null;
        this._personnelService
            .uploadAvatar(this.personnel_id + '', file)
            .subscribe((data) => {
                // this._updateDataSource();
                this.personnel = data;
                console.log(this.personnel);
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
                type_documents: 'DOSSIERS_PERSONNELS',
                parent_id: this.personnel_id,
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
                    type_documents: 'DOSSIERS_PERSONNELS',
                    parent_id: this.personnel_id,
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
