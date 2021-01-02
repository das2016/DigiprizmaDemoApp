import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { CustomerDto } from './CustomerDto';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers$:Array<CustomerDto> = [];
  isUpdateError:boolean;
  
  constructor(private customerService : CustomerService) { }

  ngOnInit(): void {
    this.onGetAllCustomers();
  }

  onGetAllCustomers(){
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customers$ = customers;
      this.customers$.reverse();
    })
  }
}
