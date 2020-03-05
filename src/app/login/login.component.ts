import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  valid : boolean = true;
  textError : string;
  formlogin : FormGroup ;

  constructor( 
    private fb : FormBuilder,
    private spinner: NgxSpinnerService,
    public authFa: AngularFireAuth
     ) { }

  ngOnInit() {
    this.initControl();
  }

  initControl(){
    this.formlogin = this.fb.group({
      email : ['', Validators.compose([Validators.email,Validators.required])],
      password : ['', Validators.compose([Validators.required])],
    });
  }

  login() {
    if(this.formlogin.valid){
      this.valid = true;
      this.spinner.show();
      this.authFa.signInWithEmailAndPassword(this.formlogin.controls["email"].value,this.formlogin.controls["password"].value)
      .then(response =>{
        console.log(response);
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 5000);
      }).catch(error=>{
        this.spinner.hide();
        this.valid = false;
        this.textError = error.message;
      }) ;
    }
    else{
      this.valid = false;
      this.textError ="Datos no validos";
    }
  }

}
