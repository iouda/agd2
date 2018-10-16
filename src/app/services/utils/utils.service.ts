import { Injectable } from '@angular/core';

@Injectable(/* {
  providedIn: 'root'
} */)
export class UtilsService {

  constructor() { }

  normalizeString(string: string): string {
    return string.toLowerCase().replace(' ', '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
