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
    total: number
}

export interface User {
  username:String,
  email: String,
  token: string,
  id:number ,
  login:boolean,
  cart: Array<DisplayCart>
}