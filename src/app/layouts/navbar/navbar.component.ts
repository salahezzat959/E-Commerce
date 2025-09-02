import { Component, computed, inject, input, OnInit, Renderer2, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive , TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogin =input<boolean>(true);
  readonly authService = inject(AuthService);
  private readonly myTranslateService =inject(MyTranslateService);
  private readonly translateService =inject(TranslateService);
  private readonly cartService =inject(CartService);

  countNum:Signal<number>=computed(  ()=> this.cartService.cartCount()  );
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {

    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=> {
        console.log(res);
        this.cartService.cartCount.set(res.numOfCartItems);
      }
    })
  }

  change(lang:string):void {
    this.myTranslateService.changeLang(lang);
      // Hide the dropdown manually
        const dropdown = this.renderer.selectRootElement('#dropdownNavbar', true);
  this.renderer.addClass(dropdown, 'hidden');
      // const dropdown = document.getElementById('dropdownNavbar');
      // if (dropdown) {
      //   dropdown.classList.add('hidden');
      // }
  }


  currentLang(lang:string):boolean{
    return this.translateService.currentLang === lang ;
  }
}
