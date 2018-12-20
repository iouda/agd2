import { Injectable } from '@angular/core';

@Injectable(/* {
  providedIn: 'root'
} */)
export class ScrollService {



  constructor() { }

  scrollTo(destination: any, duration: number, easing = 'linear', callback: any) {
    console.log('scrollTo');
    const easings = {
      linear(t: number): number {
        return t;
      },
      easeInQuad(t: number): number {
        return t * t;
      },
      easeOutQuad(t: number): number {
        return t * (2 - t);
      },
      easeInOutQuad(t: number): number {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
      easeInCubic(t: number): number {
        return t * t * t;
      },
      easeOutCubic(t: number): number {
        return (--t) * t * t + 1;
      },
      easeInOutCubic(t: number): number {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      },
      easeInQuart(t: number): number {
        return t * t * t * t;
      },
      easeOutQuart(t: number): number {
        return 1 - (--t) * t * t * t;
      },
      easeInOutQuart(t: number): number {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
      },
      easeInQuint(t: number): number {
        return t * t * t * t * t;
      },
      easeOutQuint(t: number): number {
        return 1 + (--t) * t * t * t * t;
      },
      easeInOutQuint(t: number): number {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
      }
    };

    const element: HTMLElement = (<any>document).querySelector(`#${destination}`);
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    const destinationOffset = typeof element === 'number' ? element : element.offsetTop;
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

    if ('requestAnimationFrame' in window === false) {
      window.scroll(0, destinationOffsetToScroll);
      if (callback) {
        callback();
      }
      return;
    }

    function scroll() {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, ((now - startTime) / duration));
      const timeFunction = easings[easing](time);
      window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));
  
      if (window.pageYOffset === destinationOffsetToScroll) {
        if (callback) {
          callback();
        }
        return;
      }
  
      requestAnimationFrame(scroll);
    }
  
    scroll();
  }

}
