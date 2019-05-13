import { Component, OnInit } from '@angular/core';
import { FishTypes } from '../services/models';
import { FishingService } from '../services/fishing.service';
import { fstat } from 'fs';

@Component({
  selector: 'app-catch',
  templateUrl: './catch.component.html',
  styleUrls: ['./catch.component.less']
})
export class CatchComponent implements OnInit {
  filters:any;
  fishes = []

  maxBoats = [
    {
      Name:"Адмирал",
      Catch: 1456.56
    },
    {
      Name:"Афанасий",
      Catch: 1256.56
    },
    {
      Name:"Урюк",
      Catch: 1156.56
    },
    {
      Name:"Ласточка",
      Catch: 1056.56
    }
  ]

  bankFishings = [
    {BoatName: "Адмирал", DateStart: new Date(), DateFinish: new Date, Catch: 1200.45},
    {BoatName: "Афанасий", DateStart: new Date(), DateFinish: new Date, Catch: 1200.45},
    {BoatName: "Урюк", DateStart: new Date(), DateFinish: new Date, Catch: 1200.45},
    {BoatName: "Ласточка", DateStart: new Date(), DateFinish: new Date, Catch: 1200.45}
  ]

  curBank = this.fs.banks[0].BankId;
  

  constructor(public fs:FishingService) {
   }

  ngOnInit() {
    let d = new Date();
    this.filters = {DateStart:new Date(d.getFullYear(), d.getMonth(), 1).toISOString().substring(0,10), DateFinish:new Date(d.getFullYear(), d.getMonth()+1, 1).toISOString().substring(0,10)}
    this.getFish();
  }

  getFish(){
    this.fs.getFish(new Date(this.filters.DateStart), new Date(this.filters.DateFinish)).subscribe(fishes => {
      
      this.fishes = fishes;
      this.fishes.forEach(f => {
        f['BankId'] = this.getBanks()[0].BankId;
        this.fs.getMaxCatchBoats(f.FishType, new Date(this.filters.DateStart), new Date(this.filters.DateFinish)).subscribe(boats=>{
         
          f['MaxBoats']=boats;
        })
        this.getBankFishings(f);
        
      })
    })
  }

  getBankFishings(f){
    this.fs.getBankFishFishings(f.FishType, f['BankId']).subscribe(fishings => {
      f['BankFishings']=fishings;
    })
  }

  show(b, e){
    if(e.path[0].localName!='select'){
      b.Show = !b.Show;
    }
    
  }

  getBanks(f=null){
    
    return this.fs.banks;
  }

}
