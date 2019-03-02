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
  @Input() images = [];


  // outputs
  // @Output() activeSlide: EventEmitter<any> = new EventEmitter<any>();

  // slider ElementRef
  @ViewChild('slider') slider: ElementRef;

  // public vars
  imageIndex = 0;
  numberOfImages: number;
  sliderContainer: HTMLElement;

  constructor(
    private utils: UtilsService,
    private elm: ElementRef
  ) {}

  ngOnInit() {
    // console.log('slider', this.slider);
    // set numberOfImages
    this.numberOfImages = this.images.length;
    this.sliderContainer = this.elm.nativeElement.querySelector('.slider-container');
    this.setSliderWidth();
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
    /* imageContainer.nativeElement.classList.remove('inactive');
    imageContainer.nativeElement.classList.add('active'); */
  }

  nextImage() {
    console.log('------------> nextImage');

    const sliderContainerBox = this.sliderContainer.getBoundingClientRect();
    const width = sliderContainerBox.width;
    const slideWidth = width / this.numberOfImages;
    const left = sliderContainerBox.left - 59;
    const computedLeft = left - slideWidth;
    this.sliderContainer.style.left = `${(computedLeft > (-width + slideWidth) ? computedLeft : 0)}px`;

  }
  prevImage() {
    console.log('------------> prevImage');

    const sliderContainerBox = this.sliderContainer.getBoundingClientRect();
    const width = sliderContainerBox.width;
    const slideWidth = width / this.numberOfImages;
    const left = sliderContainerBox.left - 59;
    // console.log('left', left);
    const computedLeft = left + slideWidth;
    // console.log('width', width);
    // console.log('computedLeft', computedLeft);
    const absoluteLeft = -(width - (2 * slideWidth));
    // console.log('absoluteLeft', absoluteLeft);
    // this.sliderContainer.style.left = computedLeft + 'px'; /* `${(computedLeft > 0 ? absoluteLeft : 0)}px`; */
    this.sliderContainer.style.left = `${(computedLeft > 0 ? absoluteLeft : computedLeft)}px`;
  }

  private setSliderWidth() {
    this.sliderContainer.style.width = `calc(((70vw + 400px) * ${this.numberOfImages}) + 30px)`;
    this.sliderContainer.style.left = '0px';
  }

  log(key: any, value: any) {
    console.log(key, value);
  }

}
