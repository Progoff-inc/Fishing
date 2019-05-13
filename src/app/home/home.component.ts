import { Component, OnInit } from '@angular/core';
import { Boat, Fishing, BoatTypes } from '../services/models';
import { ModalService } from '../services/modal.service';
import { FishingService } from '../services/fishing.service';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  filters:any;
  boats = []

  constructor(public ms:ModalService, public fs:FishingService, private ls:LoadService) { }

  ngOnInit() {
    let d = new Date();
<<<<<<< HEAD
    this.filters = {Type:this.types.length>0?this.types[0]:'', DateStart:new Date(d.getFullYear(), d.getMonth(), 1).toISOString().substring(0,10), DateFinish:new Date(d.getFullYear(), d.getMonth()+1, 1).toISOString().substring(0,10)}
=======
    this.filters = {Type: this.types[0], DateStart:new Date(d.getFullYear(), d.getMonth(), 1).toISOString().substring(0,10), DateFinish:new Date(d.getFullYear(), d.getMonth()+1, 1).toISOString().substring(0,10)}
>>>>>>> 3b62570c6b7d7fd2f8411294ae300bae085d3652
    this.getBoats();
  }

  getBoats(){
<<<<<<< HEAD
    this.fs.getBoats(this.filters.Type, new Date(this.filters.DateStart), new Date(this.filters.DateFinish)).subscribe(boats => {
      console.log(boats)
=======
    console.log(this.filters.Type);
    this.fs.getBoats(this.filters.Type, new Date(this.filters.DateStart), new Date(this.filters.DateFinish)).subscribe(boats => {
      console.log(boats);
>>>>>>> 3b62570c6b7d7fd2f8411294ae300bae085d3652
      this.boats = boats;
      this.ls.showLoad=false;
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
