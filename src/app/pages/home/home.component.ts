import { Component, DestroyRef, OnInit, inject, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink, UpperCasePipe, TermtextPipe, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly categoriesService = inject(CategoriesService);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);

  categories: WritableSignal<Icategory[]> = signal([]);
  products: WritableSignal<Iproduct[]> = signal([]);
  term: string = "";

  ngOnInit(): void {
    this.getProductsData();
    this.getCategoriesData();
  }

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    rtl: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    rtl: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 }
    },
    nav: false
  };

  getCategoriesData(): void {
    this.categoriesService.getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => this.categories.set(res.data),
        error: (err) => console.log(err)
      });
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
