import { Component, OnInit, Input } from '@angular/core';
import { Boat, BoatTypes } from '../services/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FishingService } from '../services/fishing.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'update-boat',
  templateUrl: './update-boat.component.html',
  styleUrls: ['./update-boat.component.less']
})
export class UpdateBoatComponent implements OnInit {
  @Input() boat:Boat;

  boatForm:FormGroup;
  changes:Changes = new Changes;

  constructor(private fs:FishingService, private ms:ModalService, private fb:FormBuilder) { }

  ngOnInit() {
    this.boatForm = this.fb.group({
      Name: [this.boat.Name, Validators.required],
      Type: [this.boat.Type, [Validators.required]],
      Displacement: [this.boat.Displacement, [Validators.required]],
      BuildDate: [new Date(this.boat.BuildDate).toISOString().substring(0,10), Validators.required]
    });
  }

  save(){
    if(this.boatForm.invalid){
      return;
    }
    this.checkBoat();
    if(this.changes.Keys.length>0){
      this.fs.updateBoat(this.changes, this.boat.BoatId).subscribe((a)=>{
        for(let i = 0; i<this.changes.Keys.length; i++){
          this.boat[this.changes.Keys[i]] = this.changes.Values[i];
        }
        this.ms.close();
      })
    }

  }

  checkBoat(){
    Object.keys(this.boatForm.value).forEach(v => {
      if(this.boatForm.value[v]!=this.boat[v]){
        this.changes.Keys.push(v);
        this.changes.Values.push(this.boatForm.value[v]);
      }
    })
  }

  get types() { return [BoatTypes.Drifter, BoatTypes.Seiner, BoatTypes.SwimmingBase, BoatTypes.Trawler]};
  get f() { return this.boatForm.controls;}
  get formChanged() { return this.boatForm.dirty}

}

export class Changes{
  Keys:string[] = [];
  Values:string[] = [];
}
