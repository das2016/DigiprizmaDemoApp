import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CategoriesComponent } from './feature/categories/categories.component';
import { CustomersComponent } from './feature/customers/customers.component';
import { DashbordComponent } from './feature/dashbord/dashbord.component';
import { OrdersComponent } from './feature/orders/orders.component';
import { ProductsComponent } from './feature/products/products.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path:'home', component:HomeComponent},
  { path:'login', component:LoginComponent},
  { path:'signup', component:SignupComponent},
  { path:'dashboard', component:DashbordComponent},
  { path:'categories', component:CategoriesComponent},
  { path:'products', component:ProductsComponent},
  { path:'customers', component:CustomersComponent},
  { path:'orders', component:OrdersComponent},
  { path:'' , redirectTo:"/login", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
