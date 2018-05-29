import { Injectable } from '@angular/core';

// services
import { ConfigService } from '../config/config.service';

@Injectable(/* {
  providedIn: 'root'
} */)
export class WpApiService {

  constructor( private configService: ConfigService) {

    this.configService.getConfig().subscribe((config: any) => {
      console.log('config', config);
    });

  }
}
