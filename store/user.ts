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
      console.log("load");
      const us = localStorage.getItem("user");
      if (!us) this.user = console.log("no storageuser ");
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
        await fetch("http://localhost:1337/api/auth/local", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            identifier: email,
            password: password,
          }),
        }).then((response) => {
          if (response.ok) {
            response.json().then(async (responseJSON) => {
              console.log(responseJSON);
              const cartStore = useCartStore();
              const data = await fetch(
                "http://localhost:1337/api/users/me?populate[cart][populate]=copies",
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${responseJSON.jwt}`,
                  },
                  method: "GET",
                }
              );
              const dataRes = await data.json();
              console.log(dataRes);
              if (dataRes.cart === null) {
                (this.user as User) = {
                  token: responseJSON.jwt,
                  username: dataRes.username,
                  id: dataRes.id,
                  email: dataRes.email,
                  login: true,
                  adresse: dataRes.address,
                  cart: {
                    cId: cartStore.cart.cId,
                    products: cartStore.cart.products,
                  },
                };
              } else {
                console.log("cart pas egal a null", dataRes);
                let ids = new Set(
                  cartStore.cart.products.map((d: { id: any }) => d.id)
                );
                (this.user as User) = {
                  token: responseJSON.jwt,
                  username: dataRes.username,
                  id: dataRes.id,
                  email: dataRes.email,
                  login: true,
                  adresse: dataRes.address,
                  cart: {
                    cId: dataRes.cart.uid,
                    products: [
                      ...cartStore.cart.products,
                      ...dataRes.cart.copies.filter(
                        (d: { id: unknown }) => !ids.has(d.idOfProduct)
                      ),
                    ],
                  },
                };
              }
              console.log(this.user);

              localStorage.setItem("user", JSON.stringify(this.user));
              cartStore.mutation();
            });
          } else {
            console.log("error");
          }
        });

        console.log(localStorage.getItem("user"));
      } catch (error) {}
    },

    async create(formCreate: {
      firstname: string;
      lastname: string;
      email: any;
      password: any;
      adresse: any;
    }) {
      const cartStore = useCartStore();
      const body = {
        username: formCreate.firstname + " " + formCreate.lastname,
        email: formCreate.email,
        password: formCreate.password,
        adresse: formCreate.adresse,
      };
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
            console.log(responseJSON);
            (this.user as User) = {
              token: responseJSON.jwt,
              username: responseJSON.user.username,
              id: responseJSON.user.id,
              email: responseJSON.user.email,
              login: true,
              adresse: responseJSON.user.adresse,
              cart: [],
            };
          });
        (this.user as User).cart.push.apply(
          (this.user as User).cart,
          cartStore.cart.products
        );
        console.log(this.user);

        localStorage.setItem("user", JSON.stringify(this.user));
      } catch (error) {
        console.log(error);
      }
    },

    async change(formChange: { email: any; newPassword: any; adresse: any }) {
      const body = {
        email: formChange.email,
        password: formChange.newPassword,
        adresse: formChange.adresse,
      };
      try {
        const data = await fetch(
          `http://localhost:1337/api/users/${this.user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.user.token}`,
            },
            method: "PUT",
            body: JSON.stringify(body),
          }
        );
        console.log(data.json());

        localStorage.setItem("user", JSON.stringify(this.user));
      } catch (error) {
        console.log(error);
      }
    },

    async logout(productData: any) {
      const cartStore = useCartStore();
      let productId = [];

      cartStore.cart.products.map(async (p: Product) => {
        console.log(p);
        if (p.hasOwnProperty("idOfProduct")) {
          const body = {
            qty: p.qty,
          };

          const putCopies = await fetch(
            `http://localhost:1337/api/copies/${p.id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.user.token}`,
              },
              method: "PUT",
              body: JSON.stringify({ data: body }),
            }
          ).then((response) => {
            if (response.ok) {
              response.json().then(async (responseJSON) => {
                console.log(responseJSON.data.id);
                productId.push(responseJSON.data.id);
              });
            }
          });
        } else {
          const body = {
            idOfProduct: p.id,
            qty: p.qty,
          };

          const postCopies = await fetch("http://localhost:1337/api/copies", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.user.token}`,
            },
            method: "POST",
            body: JSON.stringify({ data: body }),
          }).then((response) => {
            if (response.ok) {
              response.json().then(async (responseJSON) => {
                productId.push(responseJSON.data.id);
              });
            }
          });
        }
      });
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
      if (cartData.cart === null) {
        console.log(productId, "ca ne contient pas cart");
        const body = {
          uid: cartStore.cart.cId,
          copies: productId,
          users_permissions_user: this.user.id,
        };

        const data = await fetch("http://localhost:1337/api/carts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user.token}`,
          },
          method: "POST",
          body: JSON.stringify({ data: body }),
        });
      } else {
        console.log(productId, "ca contient cart");
        const body = {
          uid: cartStore.cart.cId,
          copies: productId,
          users_permissions_user: this.user.id,
        };

        const data = await fetch(
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
