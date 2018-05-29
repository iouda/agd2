// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// services
import { ConfigService } from './services/config/config.service';
import { WpApiService } from './services/wp-api/wp-api.service';

// components
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { CategoryComponent } from './components/category/category.component';
import { PostComponent } from './components/post/post.component';
import { HeadComponent } from './components/head/head.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CategoryComponent,
    PostComponent,
    HeadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ConfigService,
    WpApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
