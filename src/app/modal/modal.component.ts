import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})

export class ModalComponent implements OnInit {
  @ViewChild('modal') modal:TemplateRef<any>;


  constructor(public ms:ModalService) { 
    
  }

  ngOnInit() {
    this.ms.modal = this.modal;
    
  }

}
