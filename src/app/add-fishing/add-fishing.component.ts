import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { Fishing, Sailor, Positions } from '../services/models';
import { FishingService } from '../services/fishing.service';

@Component({
  selector: 'add-fishing',
  templateUrl: './add-fishing.component.html',
  styleUrls: ['./add-fishing.component.less']
})
export class AddFishingComponent implements OnInit {
  @Input() fishings:Fishing[];

  fishingForm:FormGroup;
  sailors:Sailor[] = [];
  submitted = false;
  csubmitted = false;
  constructor(private fb:FormBuilder, private ms:ModalService, public fs:FishingService) { }

  ngOnInit() {
    console.log(this.fishings);
    if(this.fs.boats.length==0){
      this.ms.close();
    }
    this.fishingForm = this.fb.group({
      BoatId: [0, Validators.required],
      DateStart: [new Date().toISOString().substring(0,10), Validators.required],
      DateFinish: [this.DateFinish.toISOString().substring(0,10), Validators.required]
    });
  }

  add(){
    this.submitted=true;
    if(this.fishingForm.invalid){
      
      return;
    }
    let boat = this.fs.boats.find(x => x.BoatId == this.fishingForm.value.BoatId);
    let fishing = {
      BoatId:boat.BoatId,
      DateStart:this.fishingForm.value.DateStart,
      DateFinish:this.fishingForm.value.DateFinish,
      Sailors:this.sailors
    }
    this.fs.addFishing(fishing).subscribe(fid => {
      console.log(fid);
      this.fishings.push({
        FishingId:fid,
        BoatId:boat.BoatId,
        Boat:boat,
        DateStart:this.fishingForm.value.DateStart,
        DateFinish:this.fishingForm.value.DateFinish,
        Banks:[],
        Sailors:this.sailors
      })
      this.ms.close();
    })
    
  }

  get DateFinish(){
    let date = new Date(new Date().toDateString());
    date.setDate(date.getDate()+2);
    return date;
  }

  addSailor(){
    this.csubmitted = true;
    if(this.sailors.length==0){
      this.sailors.push(new Sailor());
      this.csubmitted = false;

    }else{
      if(this.sailors[this.sailors.length-1].Name=='' || this.sailors[this.sailors.length-1].Position=='' || this.sailors[this.sailors.length-1].Surname=='' || this.sailors[this.sailors.length-1].Address==''){
        return
      }
      this.sailors.push(new Sailor());
      this.csubmitted = false;
      
    }
    
  }
  remove(i){
    this.sailors.splice(i,1);
  }

  get f() { return this.fishingForm.controls;}
  get Positions() { return [Positions.Boatswain, Positions.Captain, Positions.ChiefMate, Positions.Engineer, Positions.Navigator, Positions.RadioStaff, Positions.Sailor, Positions.Shopman]}

}
