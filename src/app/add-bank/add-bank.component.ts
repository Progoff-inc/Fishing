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
    if(n == ''){
      return;
    }
    let b = {Name:n};
    this.fs.addBank(b).subscribe(bid => {
      this.banks.push({Name:n, BankId:bid});
      this.ms.close();
    })
    
    
    
  }

}
