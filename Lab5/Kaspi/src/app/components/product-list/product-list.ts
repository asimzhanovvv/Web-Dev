import { Component, input, signal, effect } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductItem } from '../product-item/product-item';

@Component({
  selector: 'app-product-list',
  imports: [ProductItem],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  // Получаем массив продуктов от AppComponent через input()
  products = input.required<Product[]>();

  // Локальная копия для работы с удалением (нужна, чтобы менять список)
  productList = signal<Product[]>([]);

  constructor() {
    // effect() следит за изменениями input и синхронизирует локальный список
    // Это срабатывает при смене категории — список обновляется
    effect(() => {
      this.productList.set([...this.products()]);
      // const sorted = [...this.products()].sort((a, b) => b.likes - a.likes);
      // this.productList.set(sorted);
    });
  }

  // Вызывается когда ProductItemComponent emit-ит событие deleteProduct
  onDelete(id: number) {
    this.productList.update(list => list.filter(p => p.id !== id));
  }
}