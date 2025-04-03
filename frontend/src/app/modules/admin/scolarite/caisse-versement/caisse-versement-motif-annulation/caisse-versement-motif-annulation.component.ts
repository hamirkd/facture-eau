import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-caisse-versement-motif-annulation',
  templateUrl: './caisse-versement-motif-annulation.component.html',
  styleUrls: ['./caisse-versement-motif-annulation.component.scss']
})
export class CaisseVersementMotifAnnulationComponent implements OnInit {

  id
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,
  public matDialogRef: MatDialogRef<CaisseVersementMotifAnnulationComponent>,) {
        this.id = _data.id;
   }
  motif = new FormControl()
  ngOnInit(): void {

  }
  onSubmit() {

            this.matDialogRef.close({motif:this.motif.value,id:this.id});
    
}

}
