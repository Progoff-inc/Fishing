import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Формы
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

//Модальные окна
import { ModalModule, BsModalService } from 'ngx-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './services/modal.service';

//HTTP запросы
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoadService } from './services/load.service';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { LoadComponent } from './load/load.component';
import { AddBoatComponent } from './add-boat/add-boat.component';
import { UpdateBoatComponent } from './update-boat/update-boat.component';
import { FishingsComponent } from './fishings/fishings.component';
import { FishingService } from './services/fishing.service';
import { AddFishingComponent } from './add-fishing/add-fishing.component';
import { AddFishingBankComponent } from './add-fishing-bank/add-fishing-bank.component';
import { AddBankComponent } from './add-bank/add-bank.component';
import { BanksComponent } from './banks/banks.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    HomeComponent,
    MenuComponent,
    LoadComponent,
    AddBoatComponent,
    UpdateBoatComponent,
    FishingsComponent,
    AddFishingComponent,
    AddFishingBankComponent,
    AddBankComponent,
    BanksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [FormBuilder, HttpClient, ModalService, BsModalService, LoadService, FishingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
