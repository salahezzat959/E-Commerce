import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { log } from 'console';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [ CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  constructor(private cartService:CartService){}
  private readonly toastrService = inject(ToastrService)
  cartDetails:Icart={} as Icart;

ngOnInit(): void {
  this.getCartData();
  localStorage.setItem('userId',this.cartDetails._id);
}

getCartData():void{
  this.cartService.getLoggedUserCart().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.cartDetails =res.data;
    },error:(err)=>{
      console.log(err);
    }
  })
}



deleteItem(id:string):void{
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    this.cartService.removeFromCart(id).subscribe({
  next:(res)=>{
    console.log(res);
    this.cartDetails=res.data;
    this.cartService.cartCount.set(res.numOfCartItems);

  },error:(err)=>{
    console.log(err);
  }
})
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});

}

updateCount( id:string , count:number ):void{
  this.cartService.updateProductQuanity( id , count ).subscribe({
    next:(res)=>{
      console.log(res);
      if(res.status ==  "success"){
        this.toastrService.info("success","FreshCart");
      }
      this.cartDetails =res.data;
    },error:(err)=>{
      console.log(err);
    }
  })
}

clearCart():void{
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    this.cartService.clearUserCart().subscribe({
  next:(res)=>{
    console.log(res);
    if(res.message == 'success') {
      this.cartDetails ={ }as Icart;
      this.cartService.cartCount.set(0);
    }

  },error:(err)=>{
    console.log(err);
  }
})
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});
}

}
