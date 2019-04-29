import { Component, OnInit } from '@angular/core';
import { Fishing, Catch, FishingBank } from '../services/models';
import { FishingService } from '../services/fishing.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-fishings',
  templateUrl: './fishings.component.html',
  styleUrls: ['./fishings.component.less']
})
export class FishingsComponent implements OnInit {
  filters = {
    DateStart:this.DateStart,
    DateFinish:new Date(new Date().toDateString())
  }
  fishings:any;
  constructor(public fs:FishingService, public ms:ModalService) { }

  ngOnInit() {
    let d = new Date();
    this.filters = {DateStart:new Date(d.getFullYear(), d.getMonth(), 1), DateFinish:new Date(d.getFullYear(), d.getMonth()+1, 1)}
    this.getFishings();
  }

  getFishings(){
    this.fs.getFishings(this.filters.DateStart, this.filters.DateFinish).subscribe(fishings => {
      console.log(fishings);
      this.fishings = fishings;
      this.fishings.forEach(f => {
        f['Show']=false;
      })
    })
  }

  getCatch(banks:FishingBank[]){
    if(banks){
      let result:Catch[] = [];
      let i;
      banks.forEach(b => {
        b.Catches.forEach(c => {
          if((i = result.map(x => x.FishType).indexOf(c.FishType))>-1){
            result[i].Weight+=c.Weight;
          }else{
            result.push(JSON.parse(JSON.stringify(c)));
          }
        })
      })
      return result;
    }else{
      return []
    }
    
  }

  show(f){
    f.Show=!f.Show;
  }




  get types(){ return this.fishings? this.unique(this.fishings.map(x => x.Boat.Type)):[]};
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
