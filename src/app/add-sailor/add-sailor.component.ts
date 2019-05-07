import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FishingService } from '../services/fishing.service';
import { Sailor } from '../services/models';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'add-sailor',
  templateUrl: './add-sailor.component.html',
  styleUrls: ['./add-sailor.component.less']
})
export class AddSailorComponent implements OnInit {
  @Input() sailors:Sailor[];
  sailorForm:FormGroup;
  submitted = false;
  constructor(private fb:FormBuilder, private fs:FishingService, private ms:ModalService) { }

  ngOnInit() {
    this.sailorForm = this.fb.group({
      Name: ['', Validators.required],
      Surname: ['', Validators.required],
      Address: ['', Validators.required]
    });
  }

  add(){
    this.submitted = true;
    if(this.sailorForm.invalid){
      return;
    }
    this.fs.addSailor(this.sailorForm.value).subscribe(data => {
      this.sailors.unshift({
        SalorId:data,
        Name:this.sailorForm.value.Name,
        Surname:this.sailorForm.value.Surname,
        Address:this.sailorForm.value.Address
      });
      this.ms.close();
    })
  }

  get f() { return this.sailorForm.controls;}

}
