import { Component, OnInit } from '@angular/core';
import { Sailor } from '../services/models';
import { FishingService } from '../services/fishing.service';
import { ModalService } from '../services/modal.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'sailors',
  templateUrl: './sailors.component.html',
  styleUrls: ['./sailors.component.less']
})
export class SailorsComponent implements OnInit {
  sailors:Sailor[] = [];
  findResults:Sailor[];
  constructor(private fs:FishingService, public ms:ModalService, public us:UserService) { }

  ngOnInit() {
    this.fs.getSailors().subscribe(data => {
      this.sailors = data;
    })
  }

  find(v){
    if(v==''){
      this.findResults=null;
    }
    this.findResults = this.sailors.filter(x => {
      let n = x.Name+' '+x.Surname;
      return n.toUpperCase().indexOf(v.toUpperCase())>-1;
    })
  }

}
