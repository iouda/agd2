import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  ElementRef,
  EventEmitter
} from '@angular/core';

// services
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {

  // inputs
  @Input() title: string;
  @Input() images: Array<any>;

  // outputs
  @Output() activeSlide: EventEmitter<any> = new EventEmitter<any>();

  // slider ElementRef
  @ViewChild('slider') slider: ElementRef;

  // public vars
  imageIndex = 0;
  numberOfImages: number;

  constructor(
    private utils: UtilsService
  ) {}

  ngOnInit() {
    // console.log('slider', this.slider);
    // set numberOfImages
    this.numberOfImages = this.images.length;
  }

  getIdFromName(name: string): string {
    return this.utils.normalizeString(name); // name.toLowerCase().replace(' ', '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  onScreen(imageContainer: ElementRef, image: any) {
    // lazy loading images
    image.classList.add('loading');
    const lazyImage = new Image();
    lazyImage.onload = function() {
      image.src = lazyImage.src;
      image.srcset = lazyImage.srcset;
      // set image class to loaded
      image.classList.remove('loading');
      image.classList.add('loaded');
      // remove loader (or whatever) from image container
      imageContainer.nativeElement.innerHTML = '';
      // append loaded image to image-container
      imageContainer.nativeElement.appendChild( image );
    };
    // set src and srcset (start to load images)
    lazyImage.src = image.dataset.src;
    lazyImage.srcset = image.dataset.srcset;
    // change state for class
    imageContainer.nativeElement.classList.remove('inactive');
    imageContainer.nativeElement.classList.add('active');
  }

  nextImage() {
    // current slide is prevSlide
    const prevSlide = this.images[this.imageIndex].parentElement;
    // change index of active slide
    this.imageIndex = (
      (this.imageIndex < this.numberOfImages - 1) ?
      this.imageIndex + 1 :
      0
    );
    // emit event
    this.activeSlide.emit({
      slider: this.slider.nativeElement,
      activeSlideIndex: this.imageIndex,
      previousSlideElement: prevSlide,
      activeSlideElement: this.images[this.imageIndex].parentElement,
      slideDirection: 'next'
    });
  }
  prevImage() {
    // current slide is prevSlide
    const prevSlide = this.images[this.imageIndex].parentElement;
    // change index of active slide
    this.imageIndex = (
      (this.imageIndex > 0) ?
      this.imageIndex - 1 :
      this.numberOfImages - 1
    );
    // emit event
    this.activeSlide.emit({
      slider: this.slider.nativeElement,
      activeSlideIndex: this.imageIndex,
      previousSlideElement: prevSlide,
      activeSlideElement: this.images[this.imageIndex].parentElement,
      slideDirection: 'prev'
    });
  }

  log(key: any, value: any) {
    console.log(key, value);
  }

}