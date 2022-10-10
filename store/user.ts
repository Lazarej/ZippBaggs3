import { defineStore } from "pinia";
import { User, Cart, Product } from "../types/interfaces";
import { useCartStore } from "../store/cart";
import { v4 as uuid4 } from "uuid";
import { dataToEsm } from "@rollup/pluginutils";

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
      else this.user = JSON.parse(us);

      const data = await fetch(
        "http://localhost:1337/api/users/me?populate=* ",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user.token}`,
          },
          method: "GET",
        }
      );

      if (data.status === 401) this.user = {};
    },

    async login(email: any, password: any) {
      const router = useRouter();
      const us = JSON.parse(localStorage.getItem("user"));
      const cartStore = useCartStore();
      cartStore.loadCartInstance();

      try {
        const AuthResponses = await fetch(
          "http://localhost:1337/api/auth/local",
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              identifier: email,
              password: password,
            }),
          }
        );
        const auth = await AuthResponses.json();

        const copiesResponses = await fetch(
          "http://localhost:1337/api/users/me?populate[cart][populate]=copies",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.jwt}`,
            },
            method: "GET",
          }
        );
        const copies = await copiesResponses.json();

        if (copies.cart === null) {
          (this.user as User) = {
            token: auth.jwt,
            username: copies.username,
            id: copies.id,
            email: copies.email,
            login: true,
            adresse: copies.address,
            cart: {
              cId: cartStore.cart.cId,
              products: cartStore.cart.products,
            },
          };
        } else {
          let ids = new Set(
            cartStore.cart.products.map((d: { id: any }) => d.id)
          );

          (this.user as User) = {
            token: auth.jwt,
            username: copies.username,
            id: copies.id,
            email: copies.email,
            login: true,
            adresse: copies.address,
            cart: {
              cId: copies.cart.uid,
              products: [
                ...cartStore.cart.products,
                ...copies.cart.copies.filter(
                  (d: { id: unknown }) => !ids.has(d.idOfProduct)
                ),
              ],
            },
          };
        }

        localStorage.setItem("user", JSON.stringify(this.user));
        cartStore.mutation();
        router.push({ path: "/user" });
      } catch (error) {
        console.error(error);
      }
    },

    async create(formCreate: {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
      adresse: string;
    }) {
      const cartStore = useCartStore();
      const router = useRouter();
      const body = {
        username: formCreate.firstname + " " + formCreate.lastname,
        email: formCreate.email,
        password: formCreate.password,
        adresse: formCreate.adresse,
      };
      try {
        const registerResponses = await fetch(
          "http://localhost:1337/api/auth/local/register",
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(body),
          }
        );
        const register = await registerResponses.json();
        console.log(register);
        (this.user as User) = {
          token: register.jwt,
          username: register.user.username,
          id: register.user.id,
          email: register.user.email,
          login: true,
          adresse: register.user.adresse,
          cart: {
            cId: cartStore.cart.uid,
            products: cartStore.cart.products,
          },
        };
        localStorage.setItem("user", JSON.stringify(this.user));
        router.push({ path: "/" });
      } catch (error) {
        console.error(error);
      }
    },

    async change(formChange: {
      email: any;
      newPassword: any;
      adresse: any;
      oldPassword: any;
    }) {
      const body = {
        identifier: this.user.name,
        oldPassword: formChange.oldPassword,
        newPassword: formChange.newPassword,
        confirmPassword: formChange.newPassword,
      };
      try {
        const data = await fetch(`http://localhost:1337/api/password`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user.token}`,
          },
          method: "POST",
          body: JSON.stringify(body),
        });
        console.log(data.json());

        /*localStorage.setItem("user", JSON.stringify(this.user));*/
      } catch (error) {
        console.log(error);
      }
    },

    async logout() {
      const cartStore = useCartStore();
      cartStore.loadCartInstance();
      let productId = [];

      cartStore.cart.products.map(async (p: Product) => {
        if (p.hasOwnProperty("idOfProduct")) {
          const body = {
            qty: p.qty,
          };

          try {
            const putCopiesResponses = await fetch(
              `http://localhost:1337/api/copies/${p.id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${this.user.token}`,
                },
                method: "PUT",
                body: JSON.stringify({ data: body }),
              }
            );
            const putCopies = await putCopiesResponses.json();
            productId.push(putCopies.data.id);
          } 
          catch (error) {
            console.error(error);
          }
        } else {
          const body = {
            idOfProduct: p.id,
            qty: p.qty,
          };

          try {
            const postCopiesResponses = await fetch(
              "http://localhost:1337/api/copies",
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${this.user.token}`,
                },
                method: "POST",
                body: JSON.stringify({ data: body }),
              }
            );
            const postCopies = await postCopiesResponses.json();
            
            productId.push(postCopies.data.id);
          } catch (error) {
            console.error(error);
          }
        }
      });
      try {
        const cart = await fetch(
          "http://localhost:1337/api/users/me?populate[cart][populate]",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.user.token}`,
            },
            method: "GET",
          }
        );
        const cartData = await cart.json();
        console.log(cartData)
        if (cartData.cart === null) {
          console.log(productId) 
          const body = {
            uid: cartStore.cart.cId,
            copies: productId,
            users_permissions_user: this.user.id,
          };
  
        try {
          await fetch("http://localhost:1337/api/carts", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.user.token}`,
            },
            method: "POST",
            body: JSON.stringify({ data: body }),
          });
         } catch (error) {
          console.error(error)
         }
        } else {
          console.log(productId) 
          const body = {
            uid: cartStore.cart.cId,
            copies: productId,
            users_permissions_user: this.user.id,
          };
  
          try {
            await fetch(
              `http://localhost:1337/api/carts/${cartData.cart.id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${this.user.token}`,
                },
                method: "PUT",
                body: JSON.stringify({ data: body }),
              }
            );
          } catch (error) {
            console.error(error)
          }
        }
      } catch (error) {
        console.error(error)
      }
      
      this.user = {
        token: null,
        username: null,
        id: null,
        email: null,
        login: false,
        adresse: null,
        cart: { cId: null, products: null },
      };

      localStorage.setItem("user", JSON.stringify(this.user));
      console.log(localStorage.getItem("user"));
      cartStore.reset();
    },
  },
});
