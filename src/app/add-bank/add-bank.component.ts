import { Component, OnInit, Input } from '@angular/core';
import { FishingService } from '../services/fishing.service';
import { Fishing, Bank } from '../services/models';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.less']
})
export class AddBankComponent implements OnInit {
  @Input() banks:Bank[];
  submitted = false;
  constructor(public fs:FishingService, private ms:ModalService) { }
  
  ngOnInit() {
  }

  add(n){
    this.submitted = true;
    console.log(n);
    if(n == ''){
      return;
    }
    this.banks.push({BankId:this.fs.banks.length, Name:n});
    this.fs.save();
    this.ms.close();
  }

}
