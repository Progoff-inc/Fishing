import { Component, OnInit } from '@angular/core';
import { Boat, Fishing, BoatTypes } from '../services/models';
import { ModalService } from '../services/modal.service';
import { FishingService } from '../services/fishing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  filters = {
    Type:this.types.length>0?this.types[0]:'',
    DateStart:this.DateStart,
    DateFinish:new Date(new Date().toDateString())
  }
  boats = [
    {
      Name: "Адмирал",
      Type: BoatTypes.Seiner,
      Fishings: [
        {
          DateStart: new Date(),
          DateFinish: new Date(),
          Catch: 100.23
        },
        {
          DateStart: new Date(),
          DateFinish: new Date(),
          Catch: 100.23
        },
        {
          DateStart: new Date(),
          DateFinish: new Date(),
          Catch: 100.23
        },
        {
          DateStart: new Date(),
          DateFinish: new Date(),
          Catch: 100.23
        },
        {
          DateStart: new Date(),
          DateFinish: new Date(),
          Catch: 100.23
        }

      ]
    },
    {
      Name: "Ласточка",
      Type: BoatTypes.SwimmingBase,
      Fishings: [
        {
          DateStart: new Date(),
          DateFinish: new Date(),
          Catch: 1000.23
        }
      ]
    }
  ]

  constructor(public ms:ModalService, public fs:FishingService) { }

  ngOnInit() {
  }


  get types(){ return this.fs.fishings? this.unique(this.fs.fishings.map(x => x.Boat.Type)):[]};
  get DateStart() {
    let date = new Date(new Date().toDateString());
    date.setMonth(date.getMonth()-1);
    return date;
  }


  unique(arr) {
    var obj = {};
  
    for (var i = 0; i < arr.length; i++) {
      var str = arr[i];
      obj[str] = true; // запомнить строку в виде свойства объекта
    }
  
    return Object.keys(obj); // или собрать ключи перебором для IE8-
  }

}
