import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonAvatar,
    IonIcon,
    IonLabel,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class CustomerPage implements OnInit {
  constructor(private router: Router, private _dataService: DataService) {}
  ngOnInit() {
    let customerId = this._dataService.getCustomerId();
    console.log(customerId);
    this._dataService.findCustomerById(customerId).subscribe((data) => {
      const customers = data[0];
      const avatars = data[1];

      this.currentCustomer = {
        ...customers,
        avatar: avatars,
      };

      console.log(this.currentCustomer);
    });
  }

  currentCustomer: any;

  goBack() {
    this.router.navigate(['/customers']);
  }
}
