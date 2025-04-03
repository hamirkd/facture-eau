import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AnneeService } from 'app/core/services/annee.service';
import { BulletinMoyenneService } from 'app/core/services/bulletin-moyenne.service';
import { InscriptionsService } from 'app/core/services/inscriptions.service';
import { MatiereSalleClassePersonnelService } from 'app/core/services/matiere-salle-classe-personnel.service';
import { MatiereService } from 'app/core/services/matiere.service';
import { SalleClasseService } from 'app/core/services/salle-classe.service';
import { SubdivisionScolaireService } from 'app/core/services/subdivision-scolaire.service';
import { UserService } from 'app/core/user/user.service';
import { BulletinMoyenne } from 'app/models/bulletin-moyenne.model';
import { MatiereSalleClassePersonnel } from 'app/models/matiere-salle-classe-personnel.model';
import { Matiere } from 'app/models/matiere.model';
import { SalleClasse } from 'app/models/salle-classe.model';
import { SubdivisionScolaire } from 'app/models/subdivision-scolaire.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-eleve-moyenne-edit',
  templateUrl: './eleve-moyenne-edit.component.html',
  styleUrls: ['./eleve-moyenne-edit.component.scss']
})
export class EleveMoyenneEditComponent implements OnInit {

  formFieldHelpers: string[] = ['']; 
  meffort
  actualiser = true;
  rechercheText = "";
  rechercheTextNg = "";
  listeSalle:SalleClasse[]=[];
  listeMatiere:Matiere[]=[];
  classe_id:0
  salle_classe_id
  matiere_id:0;
  trimestre
  searchControl: FormControl = new FormControl();
  dataUpdated={}
  trimestreObjet: SubdivisionScolaire;
  

  eleves: BulletinMoyenne[] = [];
  dataSource: MatTableDataSource<BulletinMoyenne> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'nomprenom',
    'moyenne_travail',
    'moyenne_compo',
    'moyenne',
    'appreciation',
];
readonlyChamp = false;
currentUser:any;
listMatiereSalleClassePersonnel:MatiereSalleClassePersonnel[]=[];
listeSubdivisionScolaire:SubdivisionScolaire[]=[];
  constructor(private _anneeService:AnneeService,private salleClasseService:SalleClasseService,
    private matiereService:MatiereService,private route: ActivatedRoute,
    public subdivisionScolaireService: SubdivisionScolaireService,
    private matiereSalleClassePersonnelService:MatiereSalleClassePersonnelService,
    private _snackBar: MatSnackBar,private _bulletinMoyenneService:BulletinMoyenneService,
    private _userService:UserService) { 
      route.params.subscribe(d=>{
        this.salle_classe_id = Number(d.salle_classe_id);
        this.trimestre = d.trimestre
        if(this.salle_classe_id && this.trimestre ){
          this.readonlyChamp = true;
        }
      })
    }

  ngOnInit(): void {
    
    this._userService.user$.subscribe(user=>{
      this.currentUser=user;
      if(this.currentUser.role == 'ENSEIGNANT'){
        this.matiereSalleClassePersonnelService.getAllAnneeAndClasse({annee_id:this._anneeService.activeAnnee.id,personnel_id:this.currentUser.personnel_id}).subscribe(data=>{
          this.listMatiereSalleClassePersonnel = data as MatiereSalleClassePersonnel[];
             this.listMatiereSalleClassePersonnel.forEach(element=>{
              this.listeSalle.push(element.salle_classe)
            });
        });
      }
      else{
        this.getRefresh();
      }
    });
    
    this.subdivisionScolaireService.getAllValide().subscribe(a=>{
      this.listeSubdivisionScolaire = a;
      if(sessionStorage.getItem('trimestre')){
        this.trimestreObjet = this.listeSubdivisionScolaire.find(c=>c.code === sessionStorage.getItem('trimestre'));
        if(this.trimestreObjet) {
          this.trimestre = this.trimestreObjet.code;
          this.refresh();
        }
      }
      
    })
    
  }

  getRefresh(){
    
    this.salleClasseService.getSalleClasseByAnneeAndClasse({annee_id:this._anneeService.activeAnnee.id}).subscribe(data=>{
      this.listeSalle = data as SalleClasse[];
    });

    this.matiereService.getAllByAnneeAndSalle({annee_id:this._anneeService.activeAnnee.id,salle_classe_id:this.salle_classe_id}).subscribe(data=>{
      this.listeMatiere = data;
    });
    this._updateDataSource();
  }
  
  changerTrimestre(change) {
    this.trimestreObjet = this.listeSubdivisionScolaire.find(c=>c.code === change);
    if(this.trimestreObjet) {
      this.trimestre = this.trimestreObjet.code;
      this._updateDataSource();
    }
  }

  getEnseignantData(){

  }

  changerSalleClasse(salle_classe_id){
    let personnel_id = null;
    if(this.currentUser.role == "ENSEIGNANT")
    personnel_id = this.currentUser.personnel_id;
    this.matiereService.getAllByAnneeAndSalle({annee_id:this._anneeService.activeAnnee.id,salle_classe_id:salle_classe_id,personnel_id:personnel_id}).subscribe(data=>{
      this.listeMatiere = data as Matiere[];
      this._updateDataSource();
    },err=>{
      this.listeMatiere = [];
    this._updateDataSource();
    });
  }

  _updateDataSource() {
    this.actualiser = false; 
      this._bulletinMoyenneService
          .getAllBulletinMoyenneSalleClasseAnneeTrimestre({
              annee_id: this._anneeService.activeAnnee.id,
              salle_classe_id: this.salle_classe_id,
              trimestre:this.trimestre,matiere_id:this.matiere_id
          })
          .subscribe((data) => {
              let data2 = data as BulletinMoyenne[];
               
              data2.forEach((d) => {
                  if (d.bulletinMoyenne){
                    d.moyenne_travail =d.bulletinMoyenne['moyenne_travail'];
                    d.moyenne_compo =d.bulletinMoyenne['moyenne_compo'];
                    d.matiere_id =d.bulletinMoyenne['matiere_id'];
                    d.annee_id =d.bulletinMoyenne['annee_id'];
                    d.salle_classe_id =d.bulletinMoyenne['salle_classe_id'];
                    d.coefficient = this.listeMatiere.find((p)=>p.id==this.matiere_id)?this.listeMatiere.find((p)=>p.id=this.matiere_id)['coefficient']:null
                  }
                  else {
                    d.matiere_id = this.matiere_id;
                    d.annee_id = this._anneeService.activeAnnee.id;
                    d.coefficient = this.listeMatiere.find((p)=>p.id==this.matiere_id)?this.listeMatiere.find((p)=>p.id=this.matiere_id)['coefficient']:null
                  }
                  
              }); 
              this.dataSource.data = data2;
              
              this.dataSource.data.sort((a,b)=>{
                return a.eleve.nom+a.eleve.prenom>b.eleve.nom+b.eleve.prenom?1:-1
            })
              this.actualiser = true;
          },err=>{
            this.actualiser = true;});
  }

  sauvegarderNote(){
    
    if (!this.trimestreObjet.ecriture) {
      this._snackBar.open('Vous ne pouvez pas recalculer les moyennes pour cette classe car le trimestre est cloturé', 'Splash', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5000
      });
      return;
  }
    this.dataUpdated['btn_save']=true;
    let nombre = this.dataSource.data.length;
    this.dataSource.data.forEach(data=>{
      data['trimestre'] = this.trimestre;
      this._bulletinMoyenneService.addOrUpdate(new BulletinMoyenne(
        {
          salle_classe_id:data.salle_classe_id,
          annee_id:data.annee_id,
          matiere_id:data.matiere_id,
          trimestre:data.trimestre,
          eleve_id:data.eleve_id,
          moyenne_compo:data.moyenne_compo,
          moyenne_travail:data.moyenne_travail,
          moyenne:data.moyenne,
          total:data.total
        })).subscribe(p=>{
        nombre --;
      if(nombre==0){
        this.dataUpdated['btn_save'] = false;
      this._snackBar.open('Vos données ont été sauvegardées', 'Splash', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration:2000
      });}

      },err=>{
        this.dataUpdated['btn_save'] = false;
        this._snackBar.open('Un problème est intervenu', 'Splash', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration:2000
      });
      return;
      })
    })
  }
  
  
  refresh(){
    
    if(!this.salle_classe_id||this.salle_classe_id<=0){
      this._snackBar.open('Veuillez choisir la salle de classe', 'Splash', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration:2000
      });
      return 
    }

    if(!this.trimestre){
      this._snackBar.open('Veuillez choisir le trimestre', 'Splash', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration:2000
      });
      return 
    }

    if(!this.meffort){
      this._snackBar.open('Veuillez choisir le type', 'Splash', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration:2000
      });
      return 
    }
    if(!this.matiere_id){
      this._snackBar.open('Veuillez choisir la matière', 'Splash', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration:2000
      });
      return 
    }

    this._updateDataSource();
  }
  calculerMoyenne(){
    
    if (!this.trimestreObjet.ecriture) {
      this._snackBar.open('Vous ne pouvez pas recalculer les moyennes pour cette classe car le trimestre est cloturé', 'Splash', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5000
      });
      return;
  }
    this._bulletinMoyenneService.recalculeDesMoyennesEcompletude(
      {annee_id: this._anneeService.activeAnnee.id,
      salle_classe_id: this.salle_classe_id,
      trimestre:this.trimestre,
      matiere_id:this.matiere_id}).subscribe(data=>{
        console.log(data);
        this._snackBar.open('Le recalcule est terminé', 'Splash', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration:2000
        });
        this._updateDataSource();

      },err=>{
        console.log(err)
      })
  }

  
  
    recherche(textRecherche) {
      textRecherche = textRecherche.trim(); // Remove whitespace
      textRecherche = textRecherche.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      // this.dataSource.filter = textRecherche;
    }


    filtreByClasse(classe_id) {
      this.classe_id = classe_id;
    }

    filtreBySalleClasse(salle_classe_id) {
      this.salle_classe_id = salle_classe_id;
    }

    

    public downloadEtat(){
      // https://github.com/MaxwellADN/jspdf-invoice-template/blob/master/src/app/app.component.ts#L12
      const doc =  new jsPDF('p', 'mm', 'a4');
      
      
      autoTable(doc, {
        body: [
          [
            {
              content: '',
              styles: {
                halign: 'right',
                fontSize: 14,
              }
            }
          ],
        ],
        theme: 'plain',
        styles: {
        }
      });
      var img = new Image()
      img.src = 'assets/images/logo/logo.png'
      doc.addImage(img, 'jpeg', 15, 5, 25, 25)
   
   
  
      autoTable(doc, {
        body: [
          [
            {
              content: 'Relevé de note des élèves de la salle '+this.listeSalle.find(p=>p.id==this.salle_classe_id).libelle+ " du "+this.trimestreObjet.libelle,
              styles: {
                halign:'left',
                fontSize: 14
              }
            }
          ]
        ],
        theme: 'plain'
      });
      let data = [];
       
       
      this.dataSource.data.forEach(d=>{
        data.push([d.eleve.matricule,d.eleve.nom+" "+d.eleve.prenom,d.moyenne_compo,d.moyenne_travail])
      })
       
      autoTable(doc, {
        head: [['Matricule','Nom et Prénom','Moyenne Compo', 'Moyenne Travail']],
        body: data,
        theme: 'grid',
        headStyles:{
          fillColor: '#828993'
        },
      });
    
  
      return doc.save("Liste");
  
    }
  

}
