import { defineStore } from "pinia";
import { v4 as uuid4 } from "uuid";
import { Cart, Product, DisplayCart } from "../types/interfaces";
import { userStore } from "../store/user";
import { storeToRefs } from "pinia";
import { f } from "ohmyfetch/dist/error-d4c70d05";

interface State {
  cart: Cart | {};
  displayCart: DisplayCart[] | [];
  timer: Number | null;
}

export const useCartStore = defineStore("cart", {
  state: () => ({ cart: {}, displayCart: {}, timer: null } as State),
  getters: {},
  actions: {
    loadCartInstance() {
      const storeU = userStore();
      const cs = localStorage.getItem("cart");
      if (cs === "undefined" || !cs) this.cart = {};
      else this.cart = JSON.parse(cs);
    },

    reset() {
      console.log(localStorage.getItem("cart"));
      (this.cart as Cart).products = [];
      (this.cart as Cart).cId = uuid4();
      localStorage.setItem("cart", JSON.stringify(this.cart));
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
        let cartLocalStorage = JSON.parse(cs);
        cartLocalStorage.products = cartLocalStorage.products.map(
          (ci: Product) => {
            console.log((ci.hasOwnProperty("idOfProduct") && product.hasOwnProperty("idOfProduct")) === true)
            if (ci.hasOwnProperty("idOfProduct")) {
              console.log("contain property", ci.idOfProduct , product.id,product);
              if (ci.id == product.id) {
                console.log("contain idofprod");
                isAdded = true;
                if (path === "/cart") {
                  console.log("contain path /cart");
                  return { id: ci.id, qty: product.qty, idOfProduct: ci.idOfProduct};
                } else {
                  return { id: ci.id, qty: ci.qty + product.qty,idOfProduct: ci.idOfProduct };
                }
              }
              return { id: ci.id, qty: ci.qty,idOfProduct: ci.idOfProduct };
            } else {
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
          }
        );
        console.log(cartLocalStorage.products, 'the end')   
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
      console.log(productData);

      this.displayCart = (this.cart as Cart).products.map((ci) => {
        console.log(ci);
        const requiredProduct = productData.filter((p: { id: number }) => {
          if (ci.hasOwnProperty("idOfProduct")) {
            console.log(p.id == ci.idOfProduct);
            return p.id == ci.idOfProduct;
          } else {
            console.log(p.id == ci.id);
            return p.id == ci.id;
          }
        });
        console.log(requiredProduct[0]);
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
      console.log(this.displayCart);
    },
  },
});
