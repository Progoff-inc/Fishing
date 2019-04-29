import { Component, OnInit } from '@angular/core';
import { BoatTypes } from '../services/models';
import { FishingService } from '../services/fishing.service';

@Component({
  selector: 'bank-boats',
  templateUrl: './bank-boats.component.html',
  styleUrls: ['./bank-boats.component.less']
})
export class BankBoatsComponent implements OnInit {
  banks = []
  boats = []
  filters:any;
  constructor(private fs:FishingService) {
    console.log(this.banks)
   }

  ngOnInit() {
    let d = new Date();
    this.filters = {DateStart:new Date(d.getFullYear(), d.getMonth(), 1), DateFinish:new Date(d.getFullYear(), d.getMonth()+1, 1)}
    this.getBanks();
    
  }

  getBanks(){
    this.fs.getBanksAvgCatch(this.filters.DateStart, this.filters.DateFinish).subscribe(banks => {
      this.banks = banks;
      this.banks.forEach(b => {
        this.fs.getBankBoatsAboveAvg(b.BankId).subscribe(boats => {
          b['BoatsAvg']=boats;
        })
      })
    })
  }

  show(b){
    b.Show = !b.Show;
  }

}
