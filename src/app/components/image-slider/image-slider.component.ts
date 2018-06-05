import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {

  // inputs
  @Input() title: string;
  @Input() images: Array<any>;

  // slider
  @ViewChild('slider') slider: ElementRef;

  // public vars
  imageIndex = 0;
  numberOfImages: number;

  constructor() {}

  ngOnInit() {
    // set numberOfImages
    this.numberOfImages = this.images.length;
  }

  onScreen(element: ElementRef, image: any) {
    element.nativeElement.innerHTML = '';
    // TODO: image on load
    element.nativeElement.appendChild( image );
    element.nativeElement.classList.remove('inactive');
    element.nativeElement.classList.add('active');
  }

  nextImage() {
    this.imageIndex = (
      (this.imageIndex < this.numberOfImages - 1) ?
      this.imageIndex + 1 :
      0
    );
    console.log('nextImage imageIndex', this.imageIndex);
  }
  prevImage() {
    this.imageIndex = (
      (this.imageIndex > 0) ?
      this.imageIndex - 1 :
      this.numberOfImages - 1
    );
    console.log('prevImage imageIndex', this.imageIndex);
  }

  log(key: any, value: any) {
    console.log(key, value);
  }

}
