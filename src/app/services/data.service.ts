import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  currentCustomerId: number = 0;

  setCustomerId(id: number) {
    this.currentCustomerId = id;
  }

  getCustomerId() {
    return this.currentCustomerId;
  }
}
