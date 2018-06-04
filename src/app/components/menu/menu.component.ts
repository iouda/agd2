import { Component, OnInit } from '@angular/core';

// services
import { WpApiService } from '../../services/wp-api/wp-api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems = new Array<any>();

  constructor(
    private wpApiService: WpApiService
  ) { }

  ngOnInit() {
    // get categories
    this.wpApiService.getCategories().subscribe((categories: any) => {
      if (categories) {
        for (let i = 0; i < categories.length; i++) {
          this.menuItems.push({
            name: categories[i].name,
            slug: categories[i].slug
          });
        // console.log('menuItems', this.menuItems);
        }
      }
    });
  }

}
