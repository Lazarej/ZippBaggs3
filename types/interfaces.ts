export interface Cart{
    cId:string;
    products: Array<Product>
  }

export  interface Product{id:number, qty:number}

export interface DisplayCart {
    name: string,
    price: number,
    currency: string,
    qty: number,
    image:string
    inStock: boolean,
    id:number,
    reste: number
}