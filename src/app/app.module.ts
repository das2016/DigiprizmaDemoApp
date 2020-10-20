import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { SignupComponent } from './auth/signup/signup.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { CategoriesComponent } from './feature/categories/categories.component';
import { DashbordComponent } from './feature/dashbord/dashbord.component';
import { ProductsComponent } from './feature/products/products.component';
import { CustomersComponent } from './feature/customers/customers.component';
import { OrdersComponent } from './feature/orders/orders.component';



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
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
