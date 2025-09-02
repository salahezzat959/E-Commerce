import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Route, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 private readonly authService = inject(AuthService);
  private readonly route = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  isLoading:boolean =false;
  msgErr:string ="";
  msgSuc:string="";

  // loginForm:FormGroup = new FormGroup( {
  //   email:new FormControl(null,[Validators.required,Validators.email]),
  //   password :new FormControl(null, [Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)] ),
  // } )

  //* another simple way to creat form using form bulider

  loginForm:FormGroup = this.formBuilder.group({
    // emial: this.formBuilder.control(null)
    email:[null ,[Validators.required,Validators.email]],
    password:[null , [Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]]
  })


  submitForm():void {
    if(this.loginForm.valid) {
      this.isLoading=true;
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
      next:(res)=> {
        console.log(res);
        if(res.message === "success") {
          setTimeout(() => {
            //* you must save token

            //^ 1- save token to localStorage
            localStorage.setItem('userToken' , res.token);
            //^ 2- decode of token
            this.authService.saveUserData();
            //^ 3- navigate to home
            this.route.navigate(['/home']);
          }, 500);
          this.msgSuc = res.message;
        }
        this.isLoading=false;
      },
      error:(err:HttpErrorResponse)=> {
        console.log(err);
        this.msgErr=err.error.message;
        this.isLoading=false;
      }
    })
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }
}
