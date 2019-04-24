import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { FishingService } from '../services/fishing.service';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.less']
})
export class BanksComponent implements OnInit {

  filters = {
    DateStart:this.DateStart,
    DateFinish:new Date(new Date().toDateString())
  }
  constructor(public ms:ModalService, public fs:FishingService) { }

  ngOnInit() {
  }

  get DateStart() {
    let date = new Date(new Date().toDateString());
    date.setMonth(date.getMonth()-1);
    return date;
  }
}
