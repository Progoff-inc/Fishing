import { Component, OnInit, Input } from '@angular/core';
import { FishingService } from '../services/fishing.service';
import { Fishing, Qualities, FishingBank, Catch, FishTypes } from '../services/models';
import { ModalService } from '../services/modal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'add-fishing-bank',
  templateUrl: './add-fishing-bank.component.html',
  styleUrls: ['./add-fishing-bank.component.less']
})

export class AddFishingBankComponent implements OnInit {
  bankForm:FormGroup;
  catches:Catch[] = [];
  submitted = false;
  csubmitted = false;
  curFish = [FishTypes.Perch, FishTypes.Pike, FishTypes.Salmon, FishTypes.Saury, FishTypes.Sheatfish, FishTypes.Sturgeon, FishTypes.Trout, FishTypes.Zander,
    FishTypes.Сarp, FishTypes.Cod, FishTypes.Eel, FishTypes.Greenling, FishTypes.Grouper, FishTypes.Gudgeon, FishTypes.Mackerel];
  constructor(public fs:FishingService, private ms:ModalService, private fb:FormBuilder) { }
  @Input() fishing:Fishing;
  ngOnInit() {
    this.bankForm = this.fb.group({
      BankId: [0, Validators.required],
      Quality: [Qualities.Excellent, Validators.required],
      DateStart: [null, Validators.required],
      DateFinish: [null, Validators.required]
    });
  }

  add(){
    this.csubmitted = true;
    this.submitted = true;
    if(this.bankForm.invalid || (this.catches.length>0 && (!this.catches[this.catches.length-1].FishType || this.catches[this.catches.length-1].Weight==0))){
      return
    }
    let b = this.fs.banks.find(x => x.BankId == Number(this.bankForm.value.BankId));
    let bank:FishingBank = {
      Bank:b,
      DateStart:this.bankForm.value.DateStart,
      DateFinish:this.bankForm.value.DateFinish,
      Quality:this.bankForm.value.Quality,

      Catches:this.catches
    }
    this.fishing.Banks.push(bank);
    this.fs.save();
    this.ms.close();
  }

  addCatch(){
    this.csubmitted = true;
    if(this.catches.length==0){
      this.catches.push(new Catch());
      this.csubmitted = false;

    }else{
      if(!this.catches[this.catches.length-1].FishType || this.catches[this.catches.length-1].Weight==0){
        return
      }
      this.catches.push(new Catch());
      this.setFish();
      this.csubmitted = false;
      
    }
    
  }


  setFish(){
    let f = [FishTypes.Perch, FishTypes.Pike, FishTypes.Salmon, FishTypes.Saury, FishTypes.Sheatfish, FishTypes.Sturgeon, FishTypes.Trout, FishTypes.Zander,
      FishTypes.Сarp, FishTypes.Cod, FishTypes.Eel, FishTypes.Greenling, FishTypes.Grouper, FishTypes.Gudgeon, FishTypes.Mackerel]
      let c = this.catches.map(x => x.FishType);
      let i = 0;
      f.forEach(x => {
        if(c.indexOf(x)>-1){
          f.splice(i,1);
        }
        i++;
      })
      this.curFish = f;
  }
  remove(i){
    this.catches.splice(i,1);
    this.setFish();
  }

  get Quality() { return [Qualities.Excellent, Qualities.Good, Qualities.Normal, Qualities.Bad]};
  get Fish() { 
      
      return this.curFish;
  };
  get f() { return this.bankForm.controls;}



}
