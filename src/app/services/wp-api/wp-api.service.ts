import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

// services
import { ConfigService } from '../config/config.service';

// rxjs
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/of';

@Injectable(/* {
  providedIn: 'root'
} */)
export class WpApiService {

  // wpApiUrlSubject: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  private headers: HttpHeaders;
  private wpApiUrl: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    // set http headers
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'/* ,
      'Authorization': this.token */
    });

    // subscribe wp api url
    /* this.wpApiUrlSubject.subscribe((url: string) => {
      if (url) {
        this.wpApiUrl = url;
      }
    }); */
  }

  // READ API
  // get all categories
  getCategories(
    filterName?: string,
    filterValue?: string
  ): Observable<any> {
    console.log('wpApiService', 'getCategories');
    // return observable
    return this.read(
      'categories' +
      ((filterName && filterValue) ? `?filter[${filterName}]=${filterValue}` : '')
    );
  }
  // get category by ID
  getCategory(
    id: number,
    filterName?: string,
    filterValue?: string
  ): Observable<any> {
    // return observable
    return this.read(
      'categories/' + id +
      ((filterName && filterValue) ? `?filter[${filterName}]=${filterValue}` : '')
    );
  }
  // get posts
  getPosts(
    filterName?: string,
    filterValue?: string
  ): Observable<any> {
    // return observable
    return this.read(
      'posts' +
      ((filterName && filterValue) ? `?filter[${filterName}]=${filterValue}` : '')
    );
  }
  // get post by ID
  getPost(
    id: number,
    filterName?: string,
    filterValue?: string
  ): Observable<any> {
    // return observable
    return this.read(
      'posts/' + id +
      ((filterName && filterValue) ? `?filter[${filterName}]=${filterValue}` : '')
    );
  }



  // read
  read(endpoint: string): Observable<any> {
    // subject of url
    const subject: Subject<any> = new Subject<any>();
    // get config
    this.configService.getConfig()
    .pipe(
      tap(
        error => catchError(this.handleError<any>('config'))
      )
    )
    .subscribe((config: any) => {
      if (config && config.wpApiUrl) {
        this.wpApiUrl = config.wpApiUrl;
        // http get from API
        this.http.get<any>(
          this.wpApiUrl + endpoint,
          {
            headers: this.headers,
            responseType: 'json'
          }
        )
        .pipe(
          catchError(this.handleError<any>('read'))
        )
        .subscribe( (res: any) => {
          subject.next(res);
          subject.complete();
        });
      } else {
        // handle config error
      }
    });
    return subject;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.logService.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return Observable.of(result as T);
    };
  }


}
