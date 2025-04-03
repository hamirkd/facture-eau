import { Component, OnInit } from '@angular/core';
import { AnneeService } from 'app/core/services/annee.service';
import { InscriptionsService } from 'app/core/services/inscriptions.service';

@Component({
  selector: 'app-scolarite',
  templateUrl: './scolarite.component.html',
  styleUrls: ['./scolarite.component.scss']
})
export class ScolariteComponent implements OnInit {

  constructor(private _inscriptionService:InscriptionsService,private _anneeService:AnneeService) { }
  nombre_de_fille=0;
  nombre_de_garcon=0;
  nombre_de_fille_aff=0;
  nombre_de_garcon_aff=0;
  ngOnInit(): void {
    
    if(localStorage.getItem('nombre_de_fille')){this.nombre_de_fille=JSON.parse(localStorage.getItem('nombre_de_fille'))}
    if(localStorage.getItem('nombre_de_garcon')){this.nombre_de_garcon=JSON.parse(localStorage.getItem('nombre_de_garcon'))}
    if(localStorage.getItem('nombre_de_fille_aff')){this.nombre_de_fille_aff=JSON.parse(localStorage.getItem('nombre_de_fille_aff'))}
    if(localStorage.getItem('nombre_de_garcon_aff')){this.nombre_de_garcon_aff=JSON.parse(localStorage.getItem('nombre_de_garcon_aff'))}
    this._inscriptionService.getAllBy({annee_id:this._anneeService.activeAnnee.id}).subscribe(data=>{
      const _data= data as {genre:'M'|'F',salle_classe_id}[];
      this.nombre_de_fille = _data.filter(d=>d.genre=='F').length;
      this.nombre_de_garcon = _data.filter(d=>d.genre=='M').length;
      this.nombre_de_fille_aff = _data.filter(d=>d.genre=='F'&&d.salle_classe_id).length;
      this.nombre_de_garcon_aff = _data.filter(d=>d.genre=='M'&&d.salle_classe_id).length;
      
      localStorage.setItem('nombre_de_fille',JSON.stringify(this.nombre_de_fille));
      localStorage.setItem('nombre_de_garcon',JSON.stringify(this.nombre_de_garcon))
      localStorage.setItem('nombre_de_fille_aff',JSON.stringify(this.nombre_de_fille_aff))
      localStorage.setItem('nombre_de_garcon_aff',JSON.stringify(this.nombre_de_garcon_aff))
  })
  }

}
