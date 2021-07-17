import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {CartItem} from 'src/app/models/cart-item.model';
import {CartService} from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  items: CartItem[];
  amount: string;
  totalAmount: string;
  price: string;
  public finished: boolean;
  public itemKey: string;

  constructor(
    private cartService: CartService,
    private alertCtrl: AlertController
  ) {
  }

  ngOnInit() {
    this.fetchItem();
  }

  fetchItem() {
    this.cartService.getCart().subscribe((data: CartItem[]) => {
      this.items = data;
      this.total();
      data.map(item => {
        this.itemKey = item.key;
      });

    });
  }

  total() {
    let total = 0;
    this.items.forEach(item => {
      total += item.quantity * item.price;
    });
    this.amount = total.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    this.price = total.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  onIncrease(item: CartItem) {
    this.changeQty(1, item.id);
    this.total();
  }

  onDecrease(item: CartItem) {
    if (item.quantity === 1) {
      this.removeFromCart(item);
    } else {
      this.changeQty(-1, item.id);
    }
    this.total();
  }

  async removeFromCart(item: CartItem) {
    const alert = await this.alertCtrl.create({
      header: 'Remover',
      message: 'Deseja remover este item?',
      buttons: [
        {
          text: 'SIM',
          handler: () => this.remove(item),
        },
        {
          text: 'NÃO',
        },
      ],
    });

    alert.present();
  }

  changeQty(quantity: number, id: number) {
    const items = this.items;
    const index = items.findIndex((item) => item.id === id);
    items[index].quantity += quantity;
  }

  remove(item) {
    this.cartService.removeItem(item.key);
  }

  finish() {
    this.finished = true;
    this.cartService.sendAdmin(this.items, this.price);
    this.cartService.removeItem(this.itemKey);
  }
}
