import { defineStore } from "pinia";
import { v4 as uuid4 } from "uuid";
import { Cart, Product, DisplayCart } from "../types/interfaces";
import { userStore } from "../store/user";
import { storeToRefs } from "pinia";

interface State {
  cart: Cart | {};
  displayCart: DisplayCart[] | [];
  timer: Number | null
}

export const useCartStore = defineStore("cart", {
  state: () => ({ cart: {}, displayCart: {}, timer: null } as State),
  getters: {
    regarde(){
      if(this.cart.products = []){
        console.log('regarde')
      }
    }
  },
  actions: {
    loadCartInstance() {
      const storeU = userStore();
      const cs = localStorage.getItem("cart");
      console.log(cs);
      if (!cs) this.cart = {};
      else this.cart = JSON.parse(cs);
      console.log("load", this.cart.cid);
    },

    reset() {
      console.log(localStorage.getItem("cart"));
      (this.cart as Cart).products = [];
      localStorage.setItem("cart", JSON.stringify(this.cart));
      console.log(this.cart);
      console.log(localStorage.getItem("cart"));
    },

    watchMeGo() {
      watch((this.cart as Cart).products,
          (newVal,oldVal) => {
              console.log('hello from watchMeGo',newVal,oldVal)
          },
          { deep: true }
      )
  },

    timer(productData) {
      let date = new Date().getTime();
      const hour = Math.floor(1000 * 60 * 60);
      const minute = Math.floor(hour / 60);
      const test = Math.floor(minute * 60);
      const deadline = date + 10000;

      console.log("now", date);
      console.log("deadline", deadline);
      console.log("hour", hour);
      console.log("minute", minute);
      console.log(test);

      const interval = setInterval(() => {
        date = date + 1000;

        console.log(date, "", +1);
        if (date >= deadline) {
          console.log("test reussi");
          this.cart.products = [];
          
          this.displayCartLoad(productData);
          localStorage.setItem("cart", JSON.stringify(this.cart));
          clearInterval(interval);
        }
      }, 1000);

      

      console.log(this.cart);
      console.log(localStorage.getItem("cart"));
    },

    mutation() {
      const storeU = userStore();
      const cs = localStorage.getItem("cart");
      console.log(cs);
      this.cart = storeU.user.cart;
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    addToCart(product: Product, path) {
      const cs = localStorage.getItem("cart");
      console.log(this.cart);
      let isAdded = false;
      if (!cs)
        console.log("no storage", cs),
          (this.cart = {
            cid: uuid4(),
            products: [product],
          });
      else {
        console.log("storage", cs);
        let cartLocalStorage = JSON.parse(cs);
        console.log(cartLocalStorage);
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
      console.log(this.cart);
      console.log(localStorage.getItem("cart"));
    },
    removeFromCart(id: number, productData) {
      (this.cart as Cart).products = (this.cart as Cart).products.filter(
        (ci) => ci.id !== id
      );
      this.displayCartLoad(productData);
      localStorage.setItem("cart", JSON.stringify(this.cart));
      console.log(this.cart);
    },

    displayCartLoad(productData) {
      console.log(this.cart);

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
    },
  },
});


