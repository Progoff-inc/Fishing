import { Component, OnInit } from '@angular/core';
import { BoatTypes } from '../services/models';

@Component({
  selector: 'bank-boats',
  templateUrl: './bank-boats.component.html',
  styleUrls: ['./bank-boats.component.less']
})
export class BankBoatsComponent implements OnInit {
  banks = [
    {
      Name: "Архангельское",
      AvgCatch: 1567.5,
      Boats: [
        {Name: "Адмирал", Type: BoatTypes.Seiner},
        {Name: "Афанасий", Type: BoatTypes.Seiner},
        {Name: "Урюк", Type: BoatTypes.Seiner},
        {Name: "Ласточка", Type: BoatTypes.SwimmingBase}
      ]
    },
    {
      Name: "Архангельское",
      AvgCatch: 1567.5,
      Boats: [
        {Name: "Адмирал", Type: BoatTypes.Seiner},
        {Name: "Афанасий", Type: BoatTypes.Seiner},
        {Name: "Урюк", Type: BoatTypes.Seiner},
        {Name: "Ласточка", Type: BoatTypes.SwimmingBase}
      ]
    }
  ]
  boats = [
    {Name: "Адмирал", Catch: 3000.29},
    {Name: "Афанасий", Catch: 3000.29},
    {Name: "Урюк", Catch: 3000.29},
    {Name: "Ласточка", Catch: 3000.29}
  ]
  constructor() {
    console.log(this.banks)
   }

  ngOnInit() {
  }

  show(b){
    b.Show = !b.Show;
  }

}
