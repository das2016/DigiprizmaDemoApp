import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CustomerService } from '../customers/customer.service';
import { CustomerDto } from '../customers/CustomerDto';
import { ProductService } from '../products/product.service';
import { ProductDto } from '../products/productDto';
import { OrderService } from './order.service';
import { OrderDto } from './orderDto';
import { PorductsDto } from './ProductsDto';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders$:Array<OrderDto> = [];
  clients$:Array<CustomerDto> = [];
  products$:Array<ProductDto> = [];
  orderProducts$:Array<PorductsDto> = [];
  isUpdateError:boolean;
  showCancelModal:boolean;
  showValidateModal:boolean;
  showdetailOrderModal:boolean;
  showSendModal:boolean;
  currentOrder:OrderDto;
  customerDto:CustomerDto;
  listMessage:string;
  dtOptions: any = {};
  
  constructor(private orderService : OrderService, private customerService : CustomerService,private productService: ProductService) {
    
   }

  ngOnInit(): void {
    this.customerDto = new CustomerDto();
    this.onGetAllOrders();
    this.dtOptions = {
      pagingType: 'full_orders',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
    };
    this.customerService.getAllCustomers().subscribe(customers => {
      this.clients$ = customers; 
    })
    this.productService.getAllProducts().subscribe(product => {
      this.products$ = product
    } )
  }

  onGetAllOrders(){
    this.orderService.getAllOrders().subscribe(orders => {
      this.orders$ = orders;
      this.orders$.reverse();
    })
  }

  getClientName(order:OrderDto){
    let name = '';
    this.clients$.forEach(function (c) {
      if(c.id === order.client){
       return name=c.lastname +'-'+ c.name+ ' tel : '+c.phoneNumber;
      }
    }); 
    return name;
  }


  getClient(order:OrderDto){
    let name = new CustomerDto();
    this.clients$.forEach(function (c) {
      if(c.id === order.client){
      
       return name = c;
      }
    }); 
    return name;
  }

  getProduct(product:PorductsDto){
       return  this.products$.find(element => element.id == product.idProduct);
  }

  cancelOrder(order:OrderDto){
    this.currentOrder.status = "Annulee";
 this.orderService.update(this.currentOrder).subscribe(data=>{
  this.listMessage = "La commande a bien été annulée."
  this.isUpdateError = false;
  this.onGetAllOrders();
},err => {
  this.isUpdateError = true;
  this.listMessage = "Echec d'annulation de la commande ! veuillez réessayer ";
  this.onGetAllOrders();
});
this.closeCancelOrderDialog();
  }


  
  validateOrder(order:OrderDto){
    this.currentOrder.status = "Validee";
    this.orderService.update(this.currentOrder).subscribe(data=>{
     this.listMessage = "La commande a bien été validée."
     this.isUpdateError = false;
     this.onGetAllOrders();
   },err => {
     this.isUpdateError = true;
     this.listMessage = "Echec de validation de la commande ! veuillez réessayer ";
     this.onGetAllOrders();
   });
   this.closeValidateOrderDialog();
     }
   

     sendOrder(order:OrderDto){
      this.currentOrder.status = "Expediee";
      this.orderService.update(this.currentOrder).subscribe(data=>{
       this.listMessage = "La commande a bien été expediée."
       this.isUpdateError = false;
       this.onGetAllOrders();
     },err => {
       this.isUpdateError = true;
       this.listMessage = "Echec d'expédition de la commande ! veuillez réessayer ";
       this.onGetAllOrders();
     });
     this.closeValidateOrderDialog();
       }

 
  closeDetailOrdertDialog(){
    this.showdetailOrderModal = false;
  }

  closeCancelOrderDialog(){
    this.showCancelModal = false;
  }

  closeValidateOrderDialog(){
    this.showValidateModal = false;
  }

  closeSendOrderDialog(){
    this.showSendModal = false;
  }

  openDetailOrdertDialog(order:OrderDto){
    this.showdetailOrderModal = true;
    this.currentOrder = order;
    this.customerDto = this.getClient(order);
    this.orderProducts$ = order.products;
    console.log('show detail order model'+order.products)
  }


  openCancelOrderDialog(order:OrderDto){
    this.showCancelModal = true;
    this.currentOrder = order;
    console.log("openCancelOrderDialog : "+order.id);
  }

  openValidateOrderDialog(order:OrderDto){
    this.showValidateModal = true;
    this.currentOrder = order;
    console.log("order selected validate open: "+order.id);
  }

  openSendOrderDialog(order:OrderDto){
    this.showSendModal = true;
    this.currentOrder = order;
    console.log("order selected validate open: "+order.id);
  }


  public convetToPDF(order:OrderDto) {

var data = document.getElementById('pdfData');
console.log('data : '+data);
html2canvas(data).then(canvas => {
// Few necessary setting options
var imgWidth = 208;
var pageHeight = 295;
var imgHeight = canvas.height * imgWidth / canvas.width;
var heightLeft = imgHeight;
 
const contentDataURL = canvas.toDataURL('image/png')
let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
var position = 0;
pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
pdf.save("fc"+this.currentOrder.reference+'.pdf'); // Generated PDF
});
}

}
