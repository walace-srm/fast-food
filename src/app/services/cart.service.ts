import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CartItem} from '../models/cart-item.model';
import {map} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private uid: string;
  private items$ = new BehaviorSubject<CartItem[]>([]);

  constructor(
    private db: AngularFireDatabase
  ) {
    this.fetchUid();
  }

  fetchUid() {
    const userId = JSON.parse(localStorage.getItem('user'));
    this.uid = userId?.uid || null;
  }

  getCart() {
    return this.db.list('item',ref => ref.orderByChild('uid').equalTo(this.uid))
      .snapshotChanges()
      .pipe(map(changes =>
        // @ts-ignore
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      ));
  }

  addToCart(newItem: CartItem) {
    this.db.list('item').push({
      ...newItem,
      uid: this.uid
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

  sendAdmin(newItem, price) {
    this.db.list('admin').push({
      ...newItem,
      price,
    });
  }

  // removeRange(firebaseArray, start, end) {
  //   const keys = {};
  //   if (end === undefined) {
  //     end = firebaseArray.length;
  //   }
  //   for (var i = start; i < end; ++i) {
  //     keys[firebaseArray.$keyAt(i)] = null;
  //   }
  //   return firebaseArray.$ref().update(keys);
  // }
}
