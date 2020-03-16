import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from "../views/GoodsList"
import cart from "../views/cart"
import Cartdress from "../views/Cartdress"
import orderConfirm from "../views/orderConfirm"
import orderSuccess from "../views/orderSuccess";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/Cartdress',
      name: 'Cartdress',
      component: Cartdress
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: orderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: orderSuccess
    }
  ]
})
