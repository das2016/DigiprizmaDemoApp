import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { SignupComponent } from './auth/signup/signup.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { CategoriesComponent } from './feature/categories/categories.component';
import { DashbordComponent } from './feature/dashbord/dashbord.component';
import { ProductsComponent } from './feature/products/products.component';
import { CustomersComponent } from './feature/customers/customers.component';
import { OrdersComponent } from './feature/orders/orders.component';
import { CommonModule } from '@angular/common';

import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProductComponent } from './user-side/product/product.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    FooterComponent,
    NavbarComponent,
    CategoriesComponent,
    DashbordComponent,
    ProductsComponent,
    CustomersComponent,
    OrdersComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    TabViewModule,
    RatingModule,
    TableModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
