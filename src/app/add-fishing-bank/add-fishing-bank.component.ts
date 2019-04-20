import { Component, OnInit, Input } from '@angular/core';
import { FishingService } from '../services/fishing.service';
import { Fishing } from '../services/models';

@Component({
  selector: 'add-fishing-bank',
  templateUrl: './add-fishing-bank.component.html',
  styleUrls: ['./add-fishing-bank.component.less']
})
export class AddFishingBankComponent implements OnInit {

  constructor(public fs:FishingService) { }
  @Input() fishing:Fishing;
  ngOnInit() {
  }

  add(n){
    this.fishing.Banks.push(n.value);
    this.fs.save();
  }



}
