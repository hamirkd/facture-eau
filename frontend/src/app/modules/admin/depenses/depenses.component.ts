import { Component, OnInit } from '@angular/core';
import { DepenseService } from 'app/core/services/depense.service';

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.scss']
})
export class DepensesComponent implements OnInit {

  constructor(private depenseService:DepenseService) { }

  data:{depenseWeek,nbr_depenseWeek,depenseMonth,nbr_depenseMonth,depenseMonth_3last,nbr_depenseMonth_3last,depenseYear,nbr_depenseYear}={depenseYear:0,nbr_depenseYear:0,depenseMonth:0,nbr_depenseMonth:0,depenseWeek:0,nbr_depenseWeek:0,depenseMonth_3last:0,nbr_depenseMonth_3last:0}

  ngOnInit(): void {
    this.depenseService.getDashBoardStatistic().subscribe(data=>{
      this.data = data
    })
  }

}
