import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerDto } from './CustomerDto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

 
  //url: String ="http://localhost:8085/api/v0/products"; 
  url: String ="http://vps-f9968a88.vps.ovh.net:8085/api/v0/clients"; 

  constructor(private httpClient: HttpClient) { }


  getAllCustomers(){
    return this.httpClient.get<Array<CustomerDto>>(this.url+'');
  }

}
