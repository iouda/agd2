// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// modules
import { InViewportModule } from 'ng-in-viewport';

// services
import { ConfigService } from './services/config/config.service';
import { WpApiService } from './services/wp-api/wp-api.service';

// components
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { CategoryComponent } from './components/category/category.component';
import { PostComponent } from './components/post/post.component';
import { HeadComponent } from './components/head/head.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CategoryComponent,
    PostComponent,
    HeadComponent,
    ImageSliderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  exports: [ InViewportModule ],
  providers: [
    ConfigService,
    WpApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
