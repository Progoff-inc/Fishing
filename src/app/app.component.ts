import { Component } from '@angular/core';
import { FishingService } from './services/fishing.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'fishing';

  constructor(public fs:FishingService, public us:UserService){
  }
}
