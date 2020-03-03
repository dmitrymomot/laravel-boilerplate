import Vue from 'vue';
import Lang from 'laravel-vue-lang';
import Composition from '@vue/composition-api';
import { InertiaApp } from '@inertiajs/inertia-vue';

// @ts-ignore
Vue.use(InertiaApp);
Vue.use(Composition);
Vue.use(Lang);

const app: any = document.getElementById('app');

new Vue({
  render: h =>
    h(InertiaApp, {
      props: {
        initialPage: JSON.parse(app.dataset.page),
        resolveComponent: (name: string) => require(`./views/${name}`).default,
      },
    }),
}).$mount(app);
