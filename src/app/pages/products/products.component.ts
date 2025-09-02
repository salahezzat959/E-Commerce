import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from '../../core/services/products/products.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-products',
  imports: [ RouterLink, UpperCasePipe, TermtextPipe, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  constructor(private readonly productsService:ProductsService) {};
  private readonly cartService =inject(CartService);
  private readonly toastrService =inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);
term:string="";
products:WritableSignal<Iproduct[]> =signal([]);

ngOnInit(): void {
  this.getProductsData();
}
getProductsData(): void {
    this.productsService.getAllProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => this.products.set(res.data),
        error: (err) => console.log(err)
      });
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.status === "success") {
            this.toastrService.success(res.message, 'FreshCart');
            this.cartService.cartCount.set(res.numOfCartItems);
          }
        },
        error: (err) => console.log(err)
      });
  }
}
