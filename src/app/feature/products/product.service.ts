import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDto } from './productDto';
import { ProductRequest } from './productRequest';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 
  //url: String ="http://localhost:8085/api/v0/products"; 
  url: String ="http://vps-f9968a88.vps.ovh.net:8085/api/v0/products"; 

  constructor(private httpClient: HttpClient) { }


  getAllProducts(){
    return this.httpClient.get<Array<ProductDto>>(this.url+'');
  }

  create(productRequest: ProductRequest): Observable<any> {
    console.log('product service');
  return  this.httpClient.post(this.url+'', productRequest, {responseType: 'text' as 'json'});
  }

  delete(idProduct:number,idCategory:number){
    console.log('product service');
    return  this.httpClient.delete(this.url+'?idCategory='+idCategory+'&idProduct='+idProduct);
  }

  update(productDto: ProductDto): Observable<any> {
    console.log('product service');
  return  this.httpClient.put(this.url+'', productDto, {responseType: 'text' as 'json'});
  }

}
