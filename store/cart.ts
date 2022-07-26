import { defineStore } from "pinia";
import { v4 as uuid4 } from "uuid";
import { Cart, Product, DisplayCart } from "../types/interfaces";
import { userStore } from "../store/user";

interface State {
  cart: Cart | {};
  displayCart: DisplayCart[] | [];
}

export const useCartStore = defineStore("cart", {
  state: () => ({ cart: {}, displayCart: {} } as State),
  getters: {},
  actions: {
    loadCartInstance() {
     
      
      const cs = localStorage.getItem("cart");
      if (!cs) this.cart = {};
      
      else this.cart = JSON.parse(cs);
      console.log('load', this.cart)

     
      
    },

    reset(){
      this.cart.products = [];
      localStorage.setItem("cart", JSON.stringify(this.cart)); 
      
    },

    mutation(){
      const storeU = userStore();
      this.cart = storeU.user.cart;
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    addToCart(product: Product, path) {
      const cs = localStorage.getItem("cart");
      let isAdded = false;
      if (!cs)
      console.log('no storage' , cs),
        this.cart = {
          cid: uuid4(),
          products: [product],
        };
      else {
        console.log('storage' , cs);
        let cartLocalStorage = JSON.parse(cs);
        cartLocalStorage.products = cartLocalStorage.products.map(
          (ci: Product) => {
            if (ci.id == product.id) {
              isAdded = true;
              if (path === "/cart") {
                return { id: ci.id, qty: product.qty };
              } else {
                return { id: ci.id, qty: ci.qty + product.qty };
              }
            }
            return { id: ci.id, qty: ci.qty };
          }
        );

        if (!isAdded)
          cartLocalStorage.products.push({ id: product.id, qty: product.qty });
        
        this.cart = cartLocalStorage;
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
      console.log(this.cart)
      console.log(localStorage.getItem("cart"))
    },
    removeFromCart(id: number, productData) {
      (this.cart as Cart).products = (this.cart as Cart).products.filter(
        (ci) => ci.id !== id
      );
      this.displayCartLoad(productData);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    displayCartLoad(productData) {
      const storeU = userStore();
      storeU.loadUserInstance();
      console.log(this.cart.products)
     
        this.displayCart = (this.cart as Cart).products.map((ci) => {
          const requiredProduct = productData.filter(
            (p: { id: number }) => p.id == ci.id
          );
          /*if (requiredProduct[0].attributes.quantity >= ci.qty)*/
          return {
            id: ci.id,
            name: requiredProduct[0].attributes.name,
            price: requiredProduct[0].attributes.price,
            qty: ci.qty,
            currency: requiredProduct[0].attributes.currency,
            image: requiredProduct[0].attributes.images.data[0].attributes.url,
            inStock:
              requiredProduct[0].attributes.quantity >= ci.qty ? true : false,
            reste: requiredProduct[0].attributes.quantity - ci.qty,
            total: requiredProduct[0].attributes.price * ci.qty,
          };
        });
      }
    },
  
});
