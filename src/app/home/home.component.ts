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

  filters:any;
  boats = []

  constructor(public ms:ModalService, public fs:FishingService) { }

  ngOnInit() {
    let d = new Date();
    this.filters = {Type:this.types.length>0?this.types[0]:'', DateStart:new Date(d.getFullYear(), d.getMonth(), 1), DateFinish:new Date(d.getFullYear(), d.getMonth()+1, 1)}
    this.getBoats();
  }

  getBoats(){
    this.fs.getBoats(this.filters.Type, this.filters.DateStart, this.filters.DateFinish).subscribe(boats => {
      this.boats = boats;
    })
  }


  get types(){ return [BoatTypes.Drifter, BoatTypes.Seiner, BoatTypes.SwimmingBase, BoatTypes.Trawler]};


  unique(arr) {
    var obj = {};
  
    for (var i = 0; i < arr.length; i++) {
      var str = arr[i];
      obj[str] = true; // запомнить строку в виде свойства объекта
    }
  
    return Object.keys(obj); // или собрать ключи перебором для IE8-
  }

}
