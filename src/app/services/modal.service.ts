import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TemplateRef, Injectable } from '@angular/core';

@Injectable()
export class ModalService{
    modalRef: BsModalRef;
    modal:TemplateRef<any>;
    type:string;
    attr:any;
    
    constructor(private modalService: BsModalService){

    }
    
    close(){
        this.type = "";
        this.modalRef.hide();
    }
    open(type, attr?){
        this.type = type;
        this.attr = attr;
        this.modalRef = this.modalService.show(this.modal);
    }
}