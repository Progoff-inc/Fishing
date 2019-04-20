import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { Fishing } from '../services/models';
import { FishingService } from '../services/fishing.service';

@Component({
  selector: 'add-fishing',
  templateUrl: './add-fishing.component.html',
  styleUrls: ['./add-fishing.component.less']
})
export class AddFishingComponent implements OnInit {
  @Input() fishings:Fishing[];

  fishingForm:FormGroup;
  submitted = false;
  constructor(private fb:FormBuilder, private ms:ModalService, public fs:FishingService) { }

  ngOnInit() {
    if(this.fs.boats.length==0){
      this.ms.close();
    }
    this.fishingForm = this.fb.group({
      Boat: [this.fs.boats[0], Validators.required],
      DateStart: [new Date().toISOString().substring(0,10), Validators.required],
      DateFinish: [this.DateFinish.toISOString().substring(0,10), Validators.required]
    });
  }

  add(){
    this.submitted=true;
    console.log(this.f);
    if(this.fishingForm.invalid){
      
      return;
    }
    this.fishings.push(this.fishingForm.value);
    this.fs.save();
    this.ms.close();
  }

  get DateFinish(){
    let date = new Date(new Date().toDateString());
    date.setDate(date.getDate()+2);
    return date;
  }

  get f() { return this.fishingForm.controls;}

}
