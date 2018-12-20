import { Component, OnInit } from '@angular/core';

// services
import { WpApiService } from '../../services/wp-api/wp-api.service';
import { ScrollService } from '../../services/scroll/scroll.service';

// models
import { Category } from '../../models/category';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems = new Array<any>();

  constructor(
    private wpApiService: WpApiService,
    private scrollService: ScrollService
  ) { }

  ngOnInit() {
    // get categories
    this.wpApiService.getCategories().subscribe((categories: any) => {
      if (categories) {
        // console.log('categories', categories);
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].count > 0) {
            this.menuItems.push(
              new Category(
                categories[i].id,
                categories[i].name,
                categories[i].description,
                categories[i].slug,
                categories[i].count
              )
            );
          } // end if
        } // end for
        // console.log('menuItems', this.menuItems);
      } // end if
    }); // end subscribe
  }

  scrollTo(elementId: string) {
    this.scrollService.scrollTo(elementId, 200, 'linear', () => {
      console.log(`Just finished scrolling to ${window.pageYOffset}px`);
    });
  }

  preventClick(event: any): void {
    // console.log(event);
    event.preventDefault();
  }

}
