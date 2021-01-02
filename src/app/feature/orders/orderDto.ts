import { PorductsDto } from './ProductsDto';

export class OrderDto {
    client: number;
    orderDate: Date;
    products: Array<PorductsDto>;
    reference: string;
    id:number;
    status:string;
}