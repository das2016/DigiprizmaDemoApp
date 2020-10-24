import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CategoryDto } from './categoriePayload';
import { CategoryRequest } from './categoryRequest';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {


  //url: String ="http://localhost:8085"; 
  url: String ="http://vps-f9968a88.vps.ovh.net:8085/api/v0/categories"; 

  constructor(private httpClient: HttpClient) { }


  getAllCategories(){
    return this.httpClient.get<Array<CategoryDto>>(this.url+'');
  }

  create(categoryRequest: CategoryRequest): Observable<any> {
    console.log('category service');
  return  this.httpClient.post(this.url+'', categoryRequest, {responseType: 'text' as 'json'});
  }

  delete(id:number){
    console.log('category service');
    return  this.httpClient.delete(this.url+'/'+id);
  }

  update(categoryDto: CategoryDto): Observable<any> {
    console.log('category service');
  return  this.httpClient.put(this.url+'', categoryDto, {responseType: 'text' as 'json'});
  }

}
