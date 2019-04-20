import { Component, OnInit } from '@angular/core';
import { Fishing } from '../services/models';
import { FishingService } from '../services/fishing.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-fishings',
  templateUrl: './fishings.component.html',
  styleUrls: ['./fishings.component.less']
})
export class FishingsComponent implements OnInit {
  filters = {
    Type:this.types.length>0?this.types[0]:'',
    DateStart:this.DateStart,
    DateFinish:new Date(new Date().toDateString())
  }
  constructor(public fs:FishingService, public ms:ModalService) { }

  ngOnInit() {
  }




  get types(){ return this.fs.fishings?this.fs.fishings.map(x => x.Boat.Type):[]};
  get DateStart() {
    let date = new Date(new Date().toDateString());
    date.setMonth(date.getMonth()-1);
    return date;
  }

}
