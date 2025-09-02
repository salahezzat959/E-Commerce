import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icategory } from '../../shared/interfaces/icategory';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService =inject(CategoriesService);
   private readonly destroyRef = inject(DestroyRef);

  categories:WritableSignal<Icategory[]> = signal([]);


  ngOnInit(): void {
    this.getCategoriesData()
  }

    getCategoriesData(): void {
    this.categoriesService.getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => this.categories.set(res.data),
        error: (err) => console.log(err)
      });
  }

}
