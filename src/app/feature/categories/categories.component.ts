import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CategorieService } from './categorie.service';
import { CategoryDto } from './categoriePayload';

import { CategoryRequest } from './categoryRequest';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  categoryDto: CategoryDto;
  categoryRequest: CategoryRequest;

  categoryForm : FormGroup;
  categoryUpdateForm : FormGroup;

  createMessage : string;
  isError : boolean;
  
  categories$: Array<CategoryDto> = [];

  showDeleteModal: boolean;
  currentCategorie: CategoryDto;

  showUpdateModal: boolean;

  isUpdateError: boolean;
  listMessage: string;
  isUpdateDialogError: boolean;

  constructor(private categoryService: CategorieService) {
    this.categoryDto = {
    designation:'',
    id:null
    }
    this.categoryRequest = {
      categoryDto:this.categoryDto,
    }
    this.onGetAllCategories();
   
   }

  ngOnInit(): void {
    this.categoryForm = new FormGroup(
      {
        designation: new FormControl('',Validators.required),
      }
    ) 

    this.categoryUpdateForm = new FormGroup(
      {
        designation: new FormControl('',Validators.required),
      }
    ) 
   
  }

  /**
   * CRUD OPERATIONS
   */
  
  deleteCategory(){
    this.categoryService.delete( this.currentCategorie.id).subscribe(data=>{
      this.listMessage = "La categorie a bien été sppruimée."
      this.isUpdateError = false;
      this.onGetAllCategories();
    },err => {
      this.isUpdateError = true;
      this.listMessage = "Echec de suppression de la catégorie ! veuillez réessayer ";
      this.onGetAllCategories();
    });
    this.closeDeleteCategoryDialog();
  }


  updateCategory(){
    if(this.categoryUpdateForm.get('designation').invalid) {
      this.isUpdateDialogError = true;
      this.listMessage = "Le champ désignation est obligatoires.";
      return;
    }
    this.currentCategorie.designation = this.categoryUpdateForm.get('designation').value;
    this.categoryService.update(this.currentCategorie).subscribe(data=>{
      this.listMessage = "La categorie a bien été modifiée."
      this.isUpdateError = false;
      this.onGetAllCategories();
    },err => {
      this.isUpdateError = true;
      this.listMessage = "Echec de modification de la catégorie ! veuillez réessayer ";
      this.onGetAllCategories();
    });
    this.closeUpdateCategoryDialog();
  }


  addCategory(){
    if(this.categoryForm.get('designation').invalid) {
      this.isError = true;
      this.createMessage = "Le champ désignation est obligatoires.";
      return;
    }
    this.categoryDto.designation = this.categoryForm.get('designation').value;
    this.categoryRequest.categoryDto = this.categoryDto;
    this.categoryService.create(this.categoryRequest).subscribe(data => {
     this.createMessage = "La categorie a été bien crée."
     this.isError = false;
     this.isUpdateDialogError = null;
     this.isUpdateError = null;
     this.categoryForm.reset();
     this.onGetAllCategories();
    }, () => {
      this.isError = true;
      this.createMessage = 'Echec de création de la catégorie ! veuillez réessayer ';
    });
  }

  onGetAllCategories(){
  this.categoryService.getAllCategories().subscribe(categories => {
    this.categories$ = categories;
    this.categories$.reverse();

  })
}

/**
 * 
 */

  resetCategory(){
    this.isError = null;

  }

  closeUpdateCategoryDialog(){
    this.showUpdateModal = false;
    this.isUpdateDialogError = null;
    this.isUpdateError = null;
    this.isError = null;
  }

  closeDeleteCategoryDialog(){
    this.showDeleteModal = false;
    this.isUpdateDialogError = null;
    this.isUpdateError = null;
    this.isError = null;
  }

  openDeleteCategoryDialog(categorie:CategoryDto){
    this.showDeleteModal = true;
    this.currentCategorie = categorie;
  }

  openUpdateCategoryDialog(categorie:CategoryDto){
   
    this.categoryUpdateForm.get('designation').setValue(categorie.designation);
    this.showUpdateModal = true;
    this.currentCategorie = categorie;
    this.isError = null;
    this.isUpdateDialogError= null;

  }
}
