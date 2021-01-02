import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../categories/categorie.service';
import { CategoryDto } from '../categories/categoriePayload';
import { ProductService } from './product.service';
import { ProductDto } from './productDto';
import { ProductRequest } from './productRequest';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

   products$:Array<ProductDto> = [];
   product:ProductDto;
   productRequest:ProductRequest;
   categories$:Array<CategoryDto> = [];
   isError:boolean;
   isUpdateError:boolean;
   createMessage:string;
   listMessage:string;
   showDeleteModal: boolean;
   currentProduct:ProductDto;
   showUpdateModal:boolean;
   isUpdateDialogError:boolean;
   productUpadte:ProductDto;
  constructor(private productService: ProductService, private categoryService: CategorieService) { 
    this.product = new ProductDto();
    this.productRequest = new ProductRequest();
  }

  ngOnInit(): void {
    this.onGetAllProducts();
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories$ = categories;
      this.categories$.reverse();
    })
  }

  /**
   * CRUD? OPERATION
   */
  updateProduct(){
    
    if(this.productUpadte.categoryId === undefined || this.productUpadte.designation === undefined || this.productUpadte.price === undefined || this.productUpadte.amount === undefined) {
      this.isUpdateDialogError = true;
      this.listMessage = "Les champs sont obligatoires.";
      return;
    }

    this.productService.update(this.productUpadte).subscribe(data=>{
      this.listMessage = "Le produit a bien été modifié."
      this.isUpdateError = false;
      this.onGetAllProducts();
    },err => {
      this.isUpdateError = true;
      this.listMessage = "Echec de modification du produit ! veuillez réessayer ";
      this.onGetAllProducts();
    });
    this.closeUpdateProductDialog();
  }



  addProduct(){
    if(this.product.categoryId === undefined || this.product.designation === undefined || this.product.price === undefined || this.product.amount === undefined) {
      this.isError = true;
      this.createMessage = "Les champs désignation/categorie sont obligatoires.";
      return;
    }

    this.productRequest.productDto=this.product;
    console.log('add product'+this.product.categoryId+'  '+this.product.designation);
    this.productService.create(this.productRequest).subscribe(data => {
      this.createMessage = "Le produit a été bien crée."
      this.isError = false;
      this.product = new ProductDto();
      this.onGetAllProducts();
     }, () => {
       this.isError = true;
       this.createMessage = 'Echec de création du produit ! veuillez réessayer ';
     });
    
  }

  onGetAllProducts(){
    this.productService.getAllProducts().subscribe(products => {
      this.products$ = products;
      this.products$.reverse();
    })
  }

  getCategorieName(product:ProductDto){
    let name = '';
    this.categories$.forEach(function (c) {
      if(c.id === product.categoryId){
       return name=c.designation;
      }
    }); 
    return name;
  }


  deleteProduct(){
    this.productService.delete( this.currentProduct.id, this.currentProduct.categoryId).subscribe(data=>{
      this.listMessage = "Le produit a été bien supprimé."
      this.isUpdateError = false;
      this.onGetAllProducts();
    },err => {
      this.isUpdateError = true;
      this.listMessage = "Echec de suppression du produit ! veuillez réessayer ";
      this.onGetAllProducts();
    });
    this.closeDeleteProductDialog();
    
  }

  /**
   * EVENT OPERATION
   */

  closeDeleteProductDialog(){
    this.showDeleteModal = false;
    this.isError = null;
  }

  openDeleteProductDialog(product:ProductDto){
    this.showDeleteModal = true;
    this.currentProduct = product;
    console.log('show delete model'+this.currentProduct)
  }

  openUpdateProductDialog(product:ProductDto){
    this.productUpadte = product;
    this.showUpdateModal = true;
    this.isError = null;
    this.isUpdateDialogError= null;
  }

  closeUpdateProductDialog(){
    this.showUpdateModal = false;
    this.isError = null;
    this.isUpdateDialogError= null;
  }
}
