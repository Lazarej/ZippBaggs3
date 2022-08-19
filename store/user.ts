import { defineStore } from "pinia";
import { User, Cart,Product } from "../types/interfaces";
import { useCartStore } from "../store/cart";

interface State {
  user: User | {};
}

export const userStore = defineStore("user", {
  state: () => ({ user: {} } as State),

  getters: {},

  actions: {
    async loadUserInstance() {
      const us = localStorage.getItem("user");
      if (!us) this.user = {};
      this.user = JSON.parse(us);
      const data = await fetch("http://localhost:1337/api/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user.token}`,
        },
        method: "GET",
      });
      if (data.status === 401) this.user = {};
    },

    reset(){
      this.user = {};
      localStorage.setItem("user", JSON.stringify(this.user)); 
      console.log(localStorage.getItem("user"))
      
    },

    async login(email, password,) {
      const cartStore = useCartStore();
      const us = JSON.parse(localStorage.getItem("user"));
      console.log(us)
      let concat = cartStore.cart.products.concat(us.cart.products)
      
      try {
        await fetch("http://localhost:1337/api/auth/local", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            identifier: email,
            password: password,
          }),
        })
          .then((response) => response.json())
          .then((responseJSON) => {
            console.log(responseJSON),
            (this.user as User) = {
              token: responseJSON.jwt,
              username: responseJSON.user.username,
              id: responseJSON.user.id,
              email: responseJSON.user.email,
              login: true,
              address: responseJSON.user.address,
              cart: {
                cId: cartStore.cart.cid,
                products: concat,
              },
            };
          });
        cartStore.mutation()
        cartStore.displayCartLoad;
        
        localStorage.setItem("user", JSON.stringify(this.user));
        console.log(cartStore.cart.cId)
        console.log(this.user)
        console.log(us)
      } catch (error) {}
    },

    async create(formCreate) {
      const cartStore = useCartStore();
      const body = {
        username: formCreate.firstname + " " + formCreate.lastname,
        email: formCreate.email,
        password: formCreate.password,
        address: formCreate.address,
      };
      console.log(body);
      try {
        const data = await fetch(
          "http://localhost:1337/api/auth/local/register",
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(body),
          }
        )
          .then((response) => response.json())
          .then((responseJSON) => {
            (this.user as User) = {
              token: responseJSON.jwt,
              username: responseJSON.user.username,
              id: responseJSON.user.id,
              email: responseJSON.user.email,
              login: true,
              address: responseJSON.user.address,
              cart: [],
            };
          });
        (this.user as User).cart.push.apply(
          (this.user as User).cart,
          cartStore.cart.products
        );

        localStorage.setItem("user", JSON.stringify(this.user));
      } catch (error) {}
    },

    logout() {
      const cartStore = useCartStore(); 
      this.user = {
        token: null,
        username: null,
        id: null,
        email: null,
        login: false,
        address: null,
        cart: { cId: cartStore.cart.cId, products: cartStore.cart.products },
      };

      localStorage.setItem("user", JSON.stringify(this.user));
      cartStore.reset()
    },
  },
});
