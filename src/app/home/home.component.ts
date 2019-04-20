import { Component, OnInit } from '@angular/core';
import { Boat, Fishing } from '../services/models';
import { ModalService } from '../services/modal.service';
import { FishingService } from '../services/fishing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  constructor(public ms:ModalService, public fs:FishingService) { }

  ngOnInit() {
  }

}
