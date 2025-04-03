import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BulletinMoyenneService } from 'app/core/services/bulletin-moyenne.service';
import { BulletinService } from 'app/core/services/bulletin.service';
import { BulletinMoyenne } from 'app/models/bulletin-moyenne.model';
import { Eleve } from 'app/models/eleve.model';
import { Matiere } from 'app/models/matiere.model';
import { SubdivisionScolaire } from 'app/models/subdivision-scolaire.model';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-bulletin-eleve',
  templateUrl: './bulletin-eleve.component.html',
  styleUrls: ['./bulletin-eleve.component.scss']
})
export class BulletinEleveComponent implements OnInit {

  displayedColumns: string[] = [
                                "libelle_matiere",
                                "moyenne_compo",
                                "moyenne_travail",
                                "moyenne",
                                "coefficient",
                                "total",
                                "appreciation",
                                "nom_prof",
                                "created_at"];
  bulletinDataSearch:{id,annee_id,eleve_id,trimestre};//{inscription_id,annee_id}={}
  trimestreObjet:SubdivisionScolaire;
  eleve:Eleve;
  bulletin:any={}
  data={}
  listeMatiere:Matiere[]=[];

  dataSource: MatTableDataSource<{}> = new MatTableDataSource();
  constructor(
    private _bulletinMoyenneService: BulletinMoyenneService,private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) _data: any,private bulletinService:BulletinService) {
      this.bulletinDataSearch = (_data.bulletinDataSearch);
      this.trimestreObjet = (_data.trimestreObjet);
      this.listeMatiere = (_data.listeMatiere);
    }

  ngOnInit(): void {
    this._updateDataSource();                    
  }
  _updateDataSource() {
    this._bulletinMoyenneService.getBulletinMoyenneByAnneeTrimestreForAllMatiereByEleve(
        this.bulletinDataSearch).subscribe(data=>{
          const dataMoyenne = data['moyenne'];
          this.eleve = data['eleve'];
          this.bulletin = data['bulletin'];
          this.listeMatiere.forEach(matiere=>{
            dataMoyenne.forEach(bu=>{
              console.log(matiere)
              console.log(bu.matiere_id,"=",matiere['matiere_id'],(bu.matiere_id==matiere['matiere_id']))
              if(bu.matiere_id==matiere['matiere_id']){
                bu['ordre']=matiere.ordre;
              }
            })
          })
          console.log(dataMoyenne)
          this.dataSource.data = dataMoyenne.sort((a,b)=>a['ordre']-b['ordre']);
        },err=>{
          console.log(err)
          if(err.error.data['eleve'])
          this.eleve = err.error.data['eleve'];
          // this.eleve = err.data['eleve'];
          
          this._snackBar.open(err.error.message, 'Splash', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration:2000
            });
        })
  }
  imprimerBulletin(){
    this.data['actualiser2'] = true;
    this._bulletinMoyenneService.telechargerUnBulletin(
      {bulletin_id:this.bulletin.id}).subscribe(data=>{
        saveAs(data,`BULLETIN_${this.bulletin.annee_id}${this.bulletin.trimestre}${this.bulletin.eleve_id}.pdf`);
        this.data['actualiser2'] = false;
      },err=>{      
        this.data['actualiser2'] = false;
        console.log(err) 
        this._snackBar.open(err.error.message, 'Splash', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration:2000
          });
      })
  }

  
  sauveBulletin(){
    
    if (!this.trimestreObjet.ecriture) {
      this._snackBar.open('Vous ne pouvez pas recalculer les moyennes pour cette classe car le trimestre est cloturé', 'Splash', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5000
      });
      return;
  }
    this.dataSource.data.forEach(data=>{
      this.data['actualiser3'] = true;
      this._bulletinMoyenneService.addOrUpdate(new BulletinMoyenne(data)).subscribe(res=>{
        console.log(res)
        this.data['actualiser3'] = false;
      },err=>{      
        this.data['actualiser3'] = false;
        console.log(err) 
        this._snackBar.open(err.error.message, 'Splash', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration:2000
          });
      })
    });

    this.data['actualiser3'] = true;
    this.bulletinService.update(this.bulletin).subscribe(res=>{
      console.log(res)
      this.data['actualiser3'] = false;
    },err=>{      
      this.data['actualiser3'] = false;
      console.log(err) 
      this._snackBar.open(err.error.message, 'Splash', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration:2000
        });
    })


  }
}
