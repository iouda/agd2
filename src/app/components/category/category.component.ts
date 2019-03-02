import {
  Component,
  OnInit,
  Input
} from '@angular/core';

// services
import { WpApiService } from '../../services/wp-api/wp-api.service';

// models
import { Category } from '../../models/category';
import { Post } from '../../models/post';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() category: Category;
  posts: Post[] = [];

  constructor(
    private wpApiService: WpApiService
  ) { }

  ngOnInit() {
    // console.log('category in category.component', this.category);
    // get category posts
    this.wpApiService.getPosts('category_name', this.category.slug).subscribe((posts: any) => {
      if (posts) {
        // console.log('loaded posts', posts);
        for (let i = 0; i < posts.length; i++) {
          this.posts.push(
            new Post(
              posts[i].id,
              posts[i].title.rendered,
              posts[i].content.rendered,
              posts[i].slug,
              ((posts[i].featuredMedia < 0) ? posts[i].featuredMedia : undefined),
              posts[i].modified_gmt,
              this.getImagesFromPostContent(posts[i].content.rendered)
            )
          );
        }
        // console.log('model posts', this.posts);
      }
    });
  }

  /**
   *
   *
   * @private
   * @param {string} postContent
   * @returns {*}
   * @memberof CategoryComponent
   */

  private getImagesFromPostContent(postContent: string): any {
    // search for src and replace by data-src for lazy loading
    postContent = postContent.replace(/src\=\"/g, 'data-src="').replace(/srcset\=\"/g, 'data-srcset="');
    // create temp nativeElement
    const tmp = document.createElement('div');
    // set innerHTML from postContent
    tmp.innerHTML = postContent;
    // select images
    const images = tmp.querySelectorAll('img');
    // clean wp images
    for (let i = 0; i < images.length; i++) {
      // console.log('image', images[i]);
      images[i].removeAttribute('width');
      images[i].removeAttribute('height');
      images[i].removeAttribute('class');
    }
    // convert NodeList to Array
    // images = Array.prototype.slice.call(images);
    // if post has images
    if (images.length > 0) {
      return images;
    }
    // default
    return undefined;
  }

}
