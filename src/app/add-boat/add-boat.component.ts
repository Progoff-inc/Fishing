import { Component, OnInit, Input } from '@angular/core';
import { Boat, BoatTypes, Fishing } from '../services/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { FishingService } from '../services/fishing.service';

@Component({
  selector: 'add-boat',
  templateUrl: './add-boat.component.html',
  styleUrls: ['./add-boat.component.less']
})
export class AddBoatComponent implements OnInit {
  @Input() boats:Boat[];

  boatForm:FormGroup;
  submitted = false;
  constructor(private fb:FormBuilder, private ms:ModalService, private fs:FishingService) { 
    console.log(this.types);
  }

  ngOnInit() {
    this.boatForm = this.fb.group({
      Name: ['', Validators.required],
      Type: ['', [Validators.required]],
      Displacement: ['', [Validators.required]],
      BuildDate: [new Date().toISOString().substring(0,10), Validators.required]
    });
  }

  add(){
    this.submitted=true;
    if(this.boatForm.invalid){
      return;
    }
    this.boats.push(this.boatForm.value);
    this.fs.save();
    this.ms.close();
  }

  get types() { return [BoatTypes.Drifter, BoatTypes.Seiner, BoatTypes.SwimmingBase, BoatTypes.Trawler]};
  get f() { return this.boatForm.controls;}

}
