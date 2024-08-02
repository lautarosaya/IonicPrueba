import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { forkJoin, from } from 'rxjs';

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

  findCustomerById(id: number) {
    const resCustomers = CapacitorHttp.get({
      url: '../../assets/json/customers.json',
    }).then((response) =>
      response.data.data.find((customer: any) => customer.id === id)
    );

    const resAvatars = CapacitorHttp.get({
      url: '../../assets/json/avatars.json',
    }).then((response) =>
      response.data.data.find((avatar: any) => avatar.id === id)
    );

    return forkJoin([resCustomers, resAvatars]);
  }
}
