import { defineStore } from "pinia";
import { User, Cart,Product } from "../types/interfaces";
import { useCartStore } from "../store/cart";
import { v4 as uuid4 } from "uuid";

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

    

    async login(email, password,) {
      const cartStore = useCartStore();
      const us = JSON.parse(localStorage.getItem("user"));
      let ids = new Set(cartStore.cart.products.map(d => d.id));
      let merge = [...cartStore.cart.products, ...us.cart.products.filter(d => !ids.has(d.id))];
      
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
                cId: !us ? cartStore.cart.cid : uuid4(),  
                products:merge,
              },
            };
          });
        
        
        localStorage.setItem("user", JSON.stringify(this.user));
        cartStore.mutation();
        console.log(JSON.parse(localStorage.getItem("user")))
        console.log(cartStore.cart)

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
      console.log(cartStore.cart) 
      this.user = {
        token: null,
        username: null,
        id: null,
        email: null,
        login: false,
        address: null,
        cart: { cId: cartStore.cart.cid, products: cartStore.cart.products },
      }
      
      localStorage.setItem("user", JSON.stringify(this.user));
      console.log(localStorage.getItem("user"))
      cartStore.reset()
    
    },
  },
});
