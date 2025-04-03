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
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { saveAs } from 'file-saver';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'environments/environment';
import { Media } from 'app/models/media.model';
import { MediaService } from 'app/core/services/media.service';
import { ClientService } from 'app/core/services/client.service';
import { Client } from 'app/models/client.model';
import { AddClientComponent } from '../add-client/add-client.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-detail-client',
    templateUrl: './detail-client.component.html',
    styleUrls: ['./detail-client.component.scss'],
})
export class DetailClientComponent implements OnInit {
    @ViewChild('supportNgForm') supportNgForm: NgForm;
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    displayedColumnsFacture: string[] = [
        'categorie',
        'echelon',
        'datedebut',
        'actions',
    ];
    client: Client = new Client({});
    data = {};
    client_id;
    dialogRef: any;
    editMode: boolean = false;
    userAvatarForm = new FormControl('');

    dataSourceFacture: MatTableDataSource<{}> = new MatTableDataSource();
    dataSourceDocument: MatTableDataSource<{}> = new MatTableDataSource();
    displayedColumnsDocument: string[] = [
        // 'type_documents',
        'no',
        'libelle_document',
        'created_at',
        'actions',
    ];
    
    token;
    urlForBackend;
    constructor(
        private _clientService: ClientService,
        private _matDialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService,
        private _snackBar: MatSnackBar,
        private _authService: AuthService,
        private _mediaService: MediaService,
        private route: ActivatedRoute,

    ) {
        this.token = this._authService.accessToken;
        this.urlForBackend = environment.urlApi;
        route.params.subscribe((d) => {
            console.log(d)
            this.client_id = Number(d.client_id);
        });

    }

    ngOnInit(): void {
        this._updateDataSource();
        this._updateDataSourceDocument();
    }
    _updateDataSource() {
        this._clientService.get(this.client_id).subscribe(data=>{
            this.client = new Client(data);
        });
    }
    supprimer(contrat) {
      
    }
  
    editer(){
        this.dialogRef = this._matDialog.open(AddClientComponent, {
          panelClass: 'w-full',
          data      : {
              client:new Client(this.client),
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
        this.client.file_name = null;
        this._clientService.removeAvatar(this.client_id).subscribe((data) => {
            console.log(data);
            this.client = data;
        });
        // Update the contact
        //  this.client.avatar = null;
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
        this.client.file_name = null;
        this._clientService
            .uploadAvatar(this.client_id + '', file)
            .subscribe((data) => {
                // this._updateDataSource();
                this.client = data;
                console.log(this.client);
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
                parent_id: this.client_id,
            })
            .subscribe((d) => {
                this.dataSourceDocument.data = d as Media[];
            });
    }
    addDocument(): void {
        // this.dialogRef = this._matDialog.open(MediaAddComponent, {
        //     panelClass: '',
        //     data: {
        //         media: {
        //             type_documents: 'DOSSIERS_PERSONNELS',
        //             parent_id: this.client_id,
        //         },
        //     },
        // });

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

    addFacture() {

    }
    imprimerFacture(element) {

    }
 
 
}
