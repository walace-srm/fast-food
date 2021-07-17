import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Food } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food.service';
import {CartItem} from "../../models/cart-item.model";

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  categories: Category[] = [];
  foods: Food[] = [];
  categiryId: Category;
  burgerCategory: boolean = true;
  acaiCategory: boolean;


  constructor(private foodService: FoodService, private router: Router) {}

  ngOnInit() {
    this.getCategories();
    this.foods = this.foodService.getFoods();
  }

  getCategories() {
    this.categories = [
      // {
      //   id: 1,
      //   label: 'All',
      //   image: 'assets/images/icons/all.png',
      //   active: true,
      // },
      {
        id: 2,
        label: 'Hambúrgueres',
        image: 'assets/images/icons/burger.png',
        active: true,
      },
      {
        id: 3,
        label: 'Dishes',
        image: 'assets/images/icons/dish.png',
        active: true,
      },
      {
        id: 4,
        label: 'Sushi',
        image: 'assets/images/icons/sushi.png',
        active: false,
      },
    ];
  }

  goToDetailPage(id: number) {
    this.router.navigate(['detail', id]);
  }

  displayCategories(id) {
    if (id === 2) {
      this.burgerCategory = true;
      this.acaiCategory = false;
    } else {
      this.acaiCategory = true;
      this.burgerCategory = false;
    }
  }

  // setBackGroundColor() {
  //   switch (this.burgerCategory) {
  //     case this.burgerCategory:
  //       return 'background-card';
  //   }
  // }

  // getStatus(status: Status) {
  //   switch (status) {
  //     case Status.FINISH:
  //       return 'green';
  //     case Status.WAITING:
  //       return 'yellow';
  //   }
  // }
}
