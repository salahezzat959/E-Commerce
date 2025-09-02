import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder= inject(FormBuilder);
  private readonly activatedRoute= inject(ActivatedRoute);
  private readonly ordersService =inject(OrdersService);
  private readonly router =inject(Router);
  cartId:string="";
  checkOutForm!:FormGroup;
  isLoading:boolean=false;

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
    localStorage.setItem('cardId',this.cartId);
  }

  initForm():void {
        this.checkOutForm = this.formBuilder.group({
        details:[null,[Validators.required]],
        phone:[null ,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city:[null,[Validators.required]]
    })
  }

  getCartId():void {
    this.activatedRoute.paramMap.subscribe({  //* Dynamic
      next:(p)=>{
        this.cartId = p.get('id')! ;
      }
    })
    // this.cartId = this.activatedRoute.snapshot.paramMap.get('id')!; //* Static
  }


  submitForm():void {
    this.isLoading=true;
    this.ordersService.checkoutPayment(this.cartId,this.checkOutForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status =='success') {
          open(res.session.url,'_self');
        }
        this.isLoading=false;
      },error:(err)=>{
        console.log(err);
      }
    })

  }


}
