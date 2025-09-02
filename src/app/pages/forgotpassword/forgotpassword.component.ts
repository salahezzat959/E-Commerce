import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {

  private readonly router = inject(Router);
  constructor(private readonly authService:AuthService){};

    step:number = 1;
    isLoading:boolean =false;
    msgErr:string ="";
    msgSuc:string="";

verifyEmail = new FormGroup ({
  email: new FormControl(null , [Validators.required,Validators.email])
})

verifyCode = new FormGroup ({
  resetCode: new FormControl(null , [Validators.required,Validators.pattern(/^[0-9]{6} $/)])
})

resetPassowrd = new FormGroup ({
  email: new FormControl(null , [Validators.required,Validators.email]),
  newPassword :new FormControl(null, [Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)] )
})

verfiyEmailSubmit(){
  this.isLoading=true;
  this.resetPassowrd.get('email')?.patchValue(this.verifyEmail.get('email')?.value!);

  this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
    next:(res)=> {
      console.log(res);
      this.msgSuc = res.statusMsg;
      if(res.statusMsg == "success") {
        this.step = 2;
      }
      else {
        this.msgErr=res.message;
      }
      this.isLoading=false;
    },error:(err)=>{
      this.msgErr=err.message;
      console.log(err);
      this.isLoading=false;
    }
  })
}
verfiyCodeSubmit(){
  this.isLoading=true;
  this.authService.setCodeVerify(this.verifyCode.value).subscribe({
    next:(res)=> {
      console.log(res);
      if(res.status == "Success") {
        this.step = 3;
      }
      this.isLoading=false;
    },error:(err)=>{
      console.log(err);
      this.msgErr=err.massage;
    }
  })
}
resetSubmit(){
  this.isLoading=true;
  this.authService.setNewPassword(this.resetPassowrd.value).subscribe({
    next:(res)=> {
      console.log(res);
      this.isLoading=false;
      localStorage.setItem('userToken',res.token);
      this.authService.saveUserData();
      this.router.navigate(['/home']);

    },error:(err)=>{
      console.log(err);
      this.isLoading=false;
    }
  })
}

}
