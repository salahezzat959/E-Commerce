import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

 //! you missing unsubscribe here

  private readonly activatedRoute =inject(ActivatedRoute);
  private readonly productService =inject(ProductsService);
    private readonly cartService =inject(CartService);
    private readonly toastrService = inject(ToastrService);

  detailsProduct:Iproduct |null = null;

//* paramMap return observable (tracking)

  ngOnInit(): void {
    //^ get the id from the active route

    this.activatedRoute.paramMap.subscribe({
      next:(p)=> {
        let id= p.get('id');
        //^ Calling API

        this.productService.getSpecificProducts(id!).subscribe({
          next:(res)=> {
            this.detailsProduct=res.data;
            console.log(this.detailsProduct);
          },
          error:(err)=> {
            console.log(err);
          }
        })
      }
    })
  }

  addToCart(id:string):void{
this.cartService.addProductToCart(id).subscribe({
  next:(res)=>{
    console.log(res);
    if(res.status=="success") {
      this.toastrService.success(res.message,'FreshCart');
      this.cartService.cartCount.set(res.numOfCartItems);
    }
  },error:(err)=>{
    console.log(err);
  }
})
}

}
