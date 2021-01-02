import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import {SelectItem} from 'primeng/api';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

 
  products: Product[];

    sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.sortOptions = [
            {label: 'Price High to Low', value: '!price'},
            {label: 'Price Low to High', value: 'price'}
        ];
    }
    
    onSortChange(event) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

}
