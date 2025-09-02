import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  constructor(private readonly ordersService:OrdersService){}

  ngOnInit(): void {
    this.getAllorders();
  }

  getAllorders():void {
        this.ordersService.allorders(localStorage.getItem('userId')!).subscribe({
      next:(res)=>{
        console.log(res);
      },error:(err)=>{
        console.log(err);
      }
    })
  }

}
