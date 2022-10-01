<template>
<Wrapper>
    <div class="card">
    <StripeElements
    v-if="stripeLoaded"
    v-slot="{ elements, instance }"
    ref="elms"
    :stripe-key="stripeKey"
    :instance-options="instanceOptions"
    :elements-options="elementsOptions"
  >
    <StripeElement ref="card" :elements="elements" :options="cardOptions" />
  </StripeElements>
  <button type="button" @click="pay">Pay</button>
  </div>
</Wrapper>
</template>


<script lang="ts">

import { useCartStore } from "../../store/cart";
import { DisplayCart } from "../../types/interfaces";
import { StripeElements, StripeElement } from 'vue-stripe-js'
import Wrapper from "~~/components/global/wrapper.vue";

export default defineComponent({
  name: "CardOnly",

  components: {
    StripeElements,
    StripeElement,
    Wrapper
},

  setup() {
    const stripeKey = ref("pk_test_51LdZrPLJW5eIdnsGHJ2J2Ak91mv9p2Un102AhWlceZ5pFMGBcoPWpjgSuo5Vh2ivWzQIViJLsXjlw8yxJe0bmUL400AQJD2bZ9"); // test key
    const instanceOptions = ref({
      // https://stripe.com/docs/js/initializing#init_stripe_js-options
    });
    const elementsOptions = ref({
      // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
    });
    const cardOptions = ref({
      // https://stripe.com/docs/stripe.js#element-options
      value: {
        postalCode: "12345",
      },
    });
    const stripeLoaded = ref(false);
    const card = ref();
    const elms = ref();

    onBeforeMount(() => {
      const stripePromise = loadStripe(stripeKey.value);
      stripePromise.then(() => {
        stripeLoaded.value = true;
      });
    });

    return {
      stripeKey,
      stripeLoaded,
      instanceOptions,
      elementsOptions,
      cardOptions,
      card,
      elms,
    };
  },

  methods: {
    pay() {
      // Get stripe element
      const cardElement = this.card.stripeElement;

      // Access instance methods, e.g. createToken()
      this.elms.instance.createToken(cardElement).then((result: object) => {
        // Handle result.error or result.token
        console.log(result);
      });
    },
  },
});
</script>

<style scoped>
.card{
    height: 300px;
    width: 600px;
}
</style>