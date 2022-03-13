import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
// 引入进度条样式
import 'nprogress/nprogress.js'
import 'nprogress/nprogress.css'

import Asided from '@/components/myAside'

import { Pagination, Form, FormItem, Input, Select, Option, DatePicker, Switch, Dialog, Tag, Table, TableColumn, Row, Col, Card, Dropdown, DropdownItem, DropdownMenu, Button, Container, Header, Aside, Main, Menu, Submenu, MenuItemGroup, MenuItem, RadioGroup, RadioButton, Breadcrumb, BreadcrumbItem } from "element-ui";

Vue.use(Pagination);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Switch);
Vue.use(Dialog);
Vue.use(Tag);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);

Vue.component(Asided.name, Asided);

Vue.config.productionTip = false

// 前置守卫判断是否存在token
router.beforeEach((to, from, next) => {
  console.log(store.state.user.token);
  // console.log(to, from);
  if (store.state.user.token && to.name == 'login') return next({ name: 'home' })

  if (to.name == 'login') next()

  if (!store.state.user.token) {
    next({ name: 'login' })
  } else {
    document.title = to.name
    next()
  }

})

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
