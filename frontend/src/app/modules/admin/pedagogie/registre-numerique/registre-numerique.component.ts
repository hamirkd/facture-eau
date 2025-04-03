import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnneeService } from 'app/core/services/annee.service';
import { SalleClasseService } from 'app/core/services/salle-classe.service';
import { SubdivisionScolaireService } from 'app/core/services/subdivision-scolaire.service';
import { Classe } from 'app/models/classe.model';
import { SalleClasse } from 'app/models/salle-classe.model';
import { SubdivisionScolaire } from 'app/models/subdivision-scolaire.model';

@Component({
  selector: 'app-registre-numerique',
  templateUrl: './registre-numerique.component.html',
  styleUrls: ['./registre-numerique.component.scss']
})
export class RegistreNumeriqueComponent implements OnInit {

  formFieldHelpers: string[] = ['']; 
  meffort
  // actualiser = true;
  rechercheText = "";
  rechercheTextNg = "";
  listeSalle:SalleClasse[]=[];
  listeClasse:Classe[]=[]
  classe_id:0
  salle_classe_id:0
  trimestre:string;
  trimestreObjet:SubdivisionScolaire;
  searchControl: FormControl = new FormControl();
  actualiser:{}={}
  btnRefresh:boolean = true;
  listeSubdivisionScolaire: SubdivisionScolaire[] = [];
  constructor(private anneeService:AnneeService,private salleClasseService:SalleClasseService,
    public subdivisionScolaireService: SubdivisionScolaireService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('meffort')){this.meffort = (sessionStorage.getItem('meffort'))}
    if(sessionStorage.getItem('salle_classe_id')){this.salle_classe_id = JSON.parse(sessionStorage.getItem('salle_classe_id'))}
     

    this.salleClasseService.getSalleClasseByAnneeAndClasse({annee_id:this.anneeService.activeAnnee.id}).subscribe(data=>{
      this.listeSalle = data as SalleClasse[];
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
  
  refresh(){
    
    if(!this.salle_classe_id||this.salle_classe_id<=0){
      this._snackBar.open('Veuillez choisir une salle de classe', 'Splash', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration:2000
      });
      return 
    }

    if(!this.trimestre){
      this._snackBar.open('Veuillez choisir un trimestre', 'Splash', {
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
    this.btnRefresh = false;
    sessionStorage.setItem("meffort",this.meffort);
    sessionStorage.setItem("trimestre",this.trimestre);
    sessionStorage.setItem("salle_classe_id",this.salle_classe_id);
    this.actualiser['btnRefresh1'] = false
    setTimeout(() => {
      this.actualiser['btnRefresh1'] = true
    }, 10);
  }
  changerTrimestre(change) {
    this.trimestreObjet = this.listeSubdivisionScolaire.find(c=>c.code === change);
    if(this.trimestreObjet) {
      this.trimestre = this.trimestreObjet.code;
      this.refresh();
    }
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

  

}
