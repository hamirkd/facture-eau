import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AnneeService } from 'app/core/services/annee.service';
import { MatiereSalleClassePersonnelService } from 'app/core/services/matiere-salle-classe-personnel.service';
import { SalleClasseService } from 'app/core/services/salle-classe.service';
import { MatiereSalleClassePersonnel } from 'app/models/matiere-salle-classe-personnel.model';
import { SalleClasse } from 'app/models/salle-classe.model';
import { AddMatiereSalleClassePersonnel } from './add-matiere-salle-classe-personnel/add-matiere-salle-classe-personnel.component';


@Component({
  selector: 'app-matiere-salle-classe-personnels',
  templateUrl: './matiere-salle-classe-personnels.component.html',
  styleUrls: ['./matiere-salle-classe-personnels.component.scss']
})
export class MatiereSalleClassePersonnelsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'annee','salle','personnel','matiere','coefficient','actions'];
  dataSource = new MatTableDataSource<MatiereSalleClassePersonnel>([]);
  dialogRef: any; 
  @ViewChild(MatTable) table: MatTable<MatiereSalleClassePersonnel>;
  listeSalle:SalleClasse[]=[];
  salle_classe_id=0;
  matiereSalleClassePersonnel:MatiereSalleClassePersonnel = new MatiereSalleClassePersonnel({});
  searchControl: FormControl = new FormControl();
  constructor(private salleClasseService:SalleClasseService,private anneeService:AnneeService,
    private _fuseConfirmationService: FuseConfirmationService,
    private _matDialog: MatDialog,private matiereSalleClassePersonnelService:MatiereSalleClassePersonnelService) { }
 

  ngOnInit(): void {
      this._updateDataSource();
      
    this.salleClasseService.getSalleClasseByAnnee({annee_id:this.anneeService.activeAnnee.id}).subscribe(data=>{
      this.listeSalle = data as SalleClasse[];
    })
  }
  

  filtreByClasse(classe_id) {
    this.salle_classe_id = classe_id;
    this._updateDataSource();
    
}
  

    recherche(textRecherche) {
      textRecherche = textRecherche.trim(); // Remove whitespace
      textRecherche = textRecherche.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = textRecherche;
    }
  _updateDataSource(){
    this.matiereSalleClassePersonnelService.getAllAnneeAndClasse({annee_id:this.anneeService.activeAnnee.id,salle_classe_id:this.salle_classe_id}).subscribe(data=>{
      let data2 = data as MatiereSalleClassePersonnel[];
      data2.forEach(d=>{
        if(d.personnel)d['nomprof'] = d.personnel.nom +" "+ d.personnel.prenom
        if(d.salle_classe)d['libelle'] = d.salle_classe.libelle
        if(d.matiere)d['matierelibelle'] = d.matiere.libelle
      })
      
      this.dataSource.data = data2
      console.log(this.dataSource.data)
    });
  }
 
  ajouter(): void
  {

      this.dialogRef = this._matDialog.open(AddMatiereSalleClassePersonnel, {
        data: {
            matiereSalleClassePersonnel: {},
            action: 'new',
        }});

      this.dialogRef.afterClosed()
          .subscribe((response: any) => {
              if ( !response )
              {
                  return;
              }
              this._updateDataSource();
          });
  }
  

editer(matiereSalleClassePersonnel: MatiereSalleClassePersonnel): void {
  this.dialogRef = this._matDialog.open(AddMatiereSalleClassePersonnel, {
      data: {
          matiereSalleClassePersonnel: matiereSalleClassePersonnel,
          action: 'edit',
      },
  });

  this.dialogRef.afterClosed().subscribe((response: any) => {
      if (!response) {
          return;
      }
      this._updateDataSource();
  });
}
 

supprimer(matiereSalleClassePersonnel: MatiereSalleClassePersonnel) {
  this.dialogRef = this._fuseConfirmationService.open({
      title: 'Suppression de matiereSalleClassePersonnel',
      message:
          'Voulez-vous supprimer la relation de  ' +
          matiereSalleClassePersonnel.personnel.nom +' ' +matiereSalleClassePersonnel.personnel.prenom +' ?',
  });
  this.dialogRef.afterClosed().subscribe((response) => {
      console.log(response);
      if (response === 'confirmed') {
         //***DELETE ONE */
         this.matiereSalleClassePersonnelService.delete(matiereSalleClassePersonnel).subscribe(data=>{
             console.log(data);
          this._updateDataSource();
         },err=>{
             console.error(err)
         })
      }
  });
}
}
