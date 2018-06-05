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

  constructor() { }

  ngOnInit() {
    // convert NodeList to Array
    this.images = Array.prototype.slice.call(this.images);
    // set numberOfImages
    this.numberOfImages = this.images.length;
    // for each image create container and add image to it
    this.images.forEach((image) => {
      const imageContainer = document.createElement('div');
      imageContainer.className = 'image-container';
      imageContainer.appendChild(image); // TODO: append while is container on screen
      this.slider.nativeElement.appendChild(imageContainer);
    });
  }

  onScreen(imageContainer: ElementRef) {
    // TODO: https://github.com/k3nsei/ng-in-viewport
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

}
