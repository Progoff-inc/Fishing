import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {
  userForm:FormGroup;
  submitted = false;
  constructor(private fb:FormBuilder, private us:UserService, private router:Router) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });
  }

  signUp(){
    this.submitted = true;
    if(this.userForm.invalid){
      return;
    }
    console.log(this.userForm.value)
    this.us.signUp(this.userForm.value).subscribe(data => {
      console.log(data);
      if(data){
        data.Password=this.userForm.value.Password;
        this.us.User = data;
        this.us.save(true);
        this.router.navigate(['/']);
      }
      
    })
    
  }

  get f(){return this.userForm.controls};
}
