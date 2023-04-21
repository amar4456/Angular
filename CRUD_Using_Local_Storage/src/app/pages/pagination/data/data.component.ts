import { Component, OnInit } from '@angular/core';
import { Customer } from './domain/customer';
import { CustomerService } from './service/customerservice';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  customers: Customer[] = [];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => (this.customers = customers));
    }

}
