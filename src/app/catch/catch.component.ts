import { Component, OnInit } from '@angular/core';
import { FishTypes } from '../services/models';
import { FishingService } from '../services/fishing.service';

@Component({
  selector: 'app-catch',
  templateUrl: './catch.component.html',
  styleUrls: ['./catch.component.less']
})
export class CatchComponent implements OnInit {
  filters = {
    DateStart:this.DateStart,
    DateFinish:new Date(new Date().toDateString())
  }
  fishes = [
    {
      Name: FishTypes.Cod,

      Fishings: [
        {BoatName: "Адмирал", DateStart: new Date(), DateFinish: new Date, Catch: 1200.45},
        {BoatName: "Афанасий", DateStart: new Date(), DateFinish: new Date, Catch: 1200.45},
        {BoatName: "Урюк", DateStart: new Date(), DateFinish: new Date, Catch: 1200.45},
        {BoatName: "Ласточка", DateStart: new Date(), DateFinish: new Date, Catch: 1200.45}
      ]
    },
    {
      Name: FishTypes.Greenling,

      Fishings: [
        {BoatName: "Адмирал", DateStart: new Date(), DateFinish: new Date, Catch: 1200.45},
        {BoatName: "Афанасий", DateStart: new Date(), DateFinish: new Date, Catch: 1200.45},
        {BoatName: "Урюк", DateStart: new Date(), DateFinish: new Date, Catch: 1200.45},
        {BoatName: "Ласточка", DateStart: new Date(), DateFinish: new Date, Catch: 1200.45}
      ]
    },
  ]

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
  constructor(public fs:FishingService) { }

  ngOnInit() {
    console.log(this.fishes);
  }

  get DateStart() {
    let date = new Date(new Date().toDateString());
    date.setMonth(date.getMonth()-1);
    return date;
  }

  show(b, e){
    if(e.path[0].localName!='select'){
      b.Show = !b.Show;
    }
    
  }

  getBanks(f){
    
    return this.fs.banks;
  }

}
