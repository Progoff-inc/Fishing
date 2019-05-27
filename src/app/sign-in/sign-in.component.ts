import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ModalService } from '../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  userForm:FormGroup;
  save = false;
  submitted = false;
  showMessage = false;
  constructor(private fb:FormBuilder, private us:UserService, private router:Router) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });
    this.userForm.valueChanges.subscribe(()=>{
      this.showMessage=false;
    })
  }

  signIn(){
    this.submitted = true;
    if(this.userForm.invalid){
      return;
    }
    this.us.signIn(this.userForm.value.Email, this.userForm.value.Password).subscribe(data => {
      if(data){
        data.Password=this.userForm.value.Password;
        data.IsAdmin = Boolean(Number(data.IsAdmin));
        this.us.User = data;
        this.us.save(true);
        this.router.navigate(['/']);
      }else{
        this.showMessage = true;
      }
      
    })
  }
  get f(){return this.userForm.controls};
}
