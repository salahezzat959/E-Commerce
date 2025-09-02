import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  constructor(private readonly brandsService:BrandsService) {}
  brands:WritableSignal<any> = signal([]);

ngOnInit(): void {
  this.displayBrands();
}

  displayBrands():void {
    this.brandsService.getAllBrands().subscribe({
      next:(res)=> {
        this.brands.set(res.data);
        console.log(res.data);

      },error:(err)=>{
        console.log(err);

      }
    })
  }
}
