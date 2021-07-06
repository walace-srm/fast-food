import { Injectable } from '@angular/core';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  getFoods(): Food[] {
    return [
      {
        id: 1,
        title: 'Simples',
        price: 6,
        unitPrice: 6,
        image: 'assets/images/icons/burger.png',
        description:
          'Pão, carne, alface, tomate, milho, ervilha, ovo de codorna, azeitona, queijo ralado, batata palha, maionese, ketchup, mostarda e cheddar',
      },
      {
        id: 3,
        title: 'X-tudo',
        price: 9,
        unitPrice: 9,
        image: 'assets/images/icons/burger.png',
        description:
          'In addition to the freshet seafood, there are corn, cilantro, and tomatoes: their first became mayonnise, the second - cream, the third - spice tomato water.',
      },
      {
        id: 4,
        title: 'X-bacon',
        price: 10,
        unitPrice: 10,
        image: 'assets/images/icons/burger.png',
        description:
          'In addition to the freshet seafood, there are corn, cilantro, and tomatoes: their first became mayonnise, the second - cream, the third - spice tomato water.',
      },
      {
        id: 5,
        title: 'Big',
        price: 12,
        unitPrice: 12,
        image: 'assets/images/icons/burger.png',
        description:
          'In addition to the freshet seafood, there are corn, cilantro, and tomatoes: their first became mayonnise, the second - cream, the third - spice tomato water.',
      },
      {
        id: 6,
        title: 'Tri',
        price: 14,
        unitPrice: 14,
        image: 'assets/images/icons/burger.png',
        description:
          'In addition to the freshet seafood, there are corn, cilantro, and tomatoes: their first became mayonnise, the second - cream, the third - spice tomato water.',
      },
    ];
  }

  getFood(id: number): Food {
    return this.getFoods().find((food) => food.id === id);
  }
}
