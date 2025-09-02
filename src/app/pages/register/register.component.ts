import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent {

  private readonly authService = inject(AuthService);
  private readonly route = inject(Router);
  private readonly formBulider =inject(FormBuilder);
  isLoading:boolean =false;
  msgErr:string ="";
  msgSuc:string="";

  //* FormControl( defult_value , Validation )
  // registerForm:FormGroup = new FormGroup( {
  //   name:new FormControl(null,[Validators.required , Validators.minLength(3) ,Validators.maxLength(15)]),
  //   email:new FormControl(null,[Validators.required,Validators.email]),
  //   password :new FormControl(null, [Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)] ),
  //   rePassword:new FormControl(null , [Validators.required]),
  //   phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  // } , {validators: this.confirmPassword} )

  registerForm:FormGroup = this.formBulider.group({
    name:[null,[Validators.required , Validators.minLength(3) ,Validators.maxLength(15)]],
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]],
    rePassword:[null,[Validators.required]],
    phone:[null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  }, {validators: this.confirmPassword } )


  submitForm():void {
    if(this.registerForm.valid) {
      this.isLoading=true;
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
      next:(res)=> {
        console.log(res);
        if(res.message === "success") {
          setTimeout(() => {
            this.route.navigate(['/login']); // programming routing (Router service) .naviate(['',data send with router])
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
      this.registerForm.markAllAsTouched(); //* will show all alerts
      // this.registerForm.setErrors({mismatch:true});
    }
  }


//* AbstractCotrol is the class base of the FormGroup and FormControl

  confirmPassword(group:AbstractControl) {
    const password = group.get('password')?.value ;
    const rePassword = group.get('rePassword')?.value ;
    return  password === rePassword  ? null : {mismatch : true} ;
  }

}
