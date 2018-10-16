import { Component, OnInit } from '@angular/core';

// services
import { WpApiService } from './services/wp-api/wp-api.service';

// models
import { Category } from './models/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'agd2';
  categories = new Array<any>();

  constructor (
    private wpApiService: WpApiService
  ) {}

  ngOnInit() {
     // get categories
     this.wpApiService.getCategories().subscribe((categories: any) => {
      if (categories) {
        // console.log('categories', categories);
        for (let i = 0; i < categories.length; i++) { // for each cat
          if (categories[i].count > 0) { // if cat has some posts
            this.categories.push(
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
      } // end if
    }); // end subscribe
  }

  log(key: any, value: any): void {
    console.log(key, value);
  }
}
