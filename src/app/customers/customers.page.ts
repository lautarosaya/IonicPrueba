import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonIcon,
} from '@ionic/angular/standalone';
//import { HttpClientModule } from '@angular/common/http';
import { forkJoin, from, map } from 'rxjs';
import { CapacitorHttp } from '@capacitor/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonLabel,
    IonItem,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonAvatar,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class CustomersPage implements OnInit {
  constructor(private router: Router, private _dataService: DataService) {}

  ngOnInit() {
    this.getCustomers().subscribe((data) => {
      const customers = data[0];
      const avatars = data[1];
      customers.map((customer: any) => {
        customer.avatar = avatars.find(
          (avatar: any) => avatar.id === customer.avatar
        );
        console.log(customer);
        this.customers = [...this.customers, customer];
      });
    });
  }

  customers: any = [];

  goToHome() {
    this.router.navigate(['/home']);
  }

  sendCustomer(id: number) {
    if (id != null || id != undefined) {
      this._dataService.setCustomerId(id);
      this.router.navigate(['/customer']);
    }
  }

  getCustomers() {
    const resCustomers = CapacitorHttp.get({
      url: '../../assets/json/customers.json',
    }).then((response) => response.data.data);

    const resAvatars = CapacitorHttp.get({
      url: '../../assets/json/avatars.json',
    }).then((response) => response.data.data);

    return forkJoin([resCustomers, resAvatars]);
  }
}
