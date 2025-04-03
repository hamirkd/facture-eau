import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-annuler',
  templateUrl: './annuler.component.html',
  styleUrls: ['./annuler.component.scss']
})
export class AnnulerComponent implements OnInit {

  id
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,
  public matDialogRef: MatDialogRef<AnnulerComponent>,) {
        this.id = _data.id;
   }
  motif = new FormControl()
  ngOnInit(): void {

  }
  onSubmit() {

            this.matDialogRef.close({motif:this.motif.value,id:this.id});
    
}
}