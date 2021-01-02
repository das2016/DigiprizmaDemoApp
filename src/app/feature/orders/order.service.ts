import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDto } from './orderDto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

   //url: String ="http://localhost:8085/api/v0/commandes"; 
   url: String ="http://vps-f9968a88.vps.ovh.net:8085/api/v0/commandes"; 

   constructor(private httpClient: HttpClient) { }
 
 
   getAllOrders(){
     return this.httpClient.get<Array<OrderDto>>(this.url+'');
   }

   update(orderDto: OrderDto): Observable<any> {
    console.log('ordet service');
  return  this.httpClient.put(this.url+'', orderDto, {responseType: 'text' as 'json'});
  }
}
