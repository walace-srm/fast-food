import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items$ = new BehaviorSubject<CartItem[]>([
    // {
    //   id: 1,
    //   name: 'Sea Food',
    //   price: 12,
    //   image: 'assets/images/foods/seafood-dishes.png',
    //   quantity: 1,
    // },
  ]);

  constructor(
    private db: AngularFireDatabase
  ) {
  }

  getCart() {
    return this.db.list('item')
      .snapshotChanges()
      .pipe(map(changes =>
        // @ts-ignore
         changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      ));
    //return this.items$.asObservable();
  }

  addToCart(newItem: CartItem) {
    this.db.list('item').push({
      ...newItem,
      //uid: this.uid
    })
      .then(() => {
      });
    this.items$.next([...this.items$.getValue(), newItem]);
  }

  removeItem(key: string) {
    this.db.object(`item/${key}`).remove();
  }

  changeQty(quantity: number, id: number) {
    const items = this.items$.getValue();
    const index = items.findIndex((item) => item.id === id);
    items[index].quantity += quantity;
    this.items$.next(items);
  }

  sendAdmin(newItem) {
    this.db.list('admin').push({
      ...newItem,
      //uid: this.uid
    });
  }
}
