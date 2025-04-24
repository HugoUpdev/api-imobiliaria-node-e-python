import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/Home.vue'
import ImovelList from '../components/ImovelList.vue'
import CadastroImovel from '../components/CadastroImovel.vue'
import ImovelDetalhes from '../components/ImovelDetalhes.vue';
import LoginAdmin from '../components/LoginAdmin.vue';
import ImovelListAdmin from '../components/ImovelListAdmin.vue'

const routes = [
    { path: '/', component: HomePage },
    { path: '/lista', component: ImovelList },
    { path: '/detalhe/:id', component: ImovelDetalhes, props: true },
    { path: '/admin', component: LoginAdmin },
    { path: '/listaadmin', component: ImovelListAdmin, meta: { requiresAuth: true } },
    { path: '/novo', component: CadastroImovel, meta: { requiresAuth: true } },
    { path: '/editar/:id', component: CadastroImovel, props: true, meta: { requiresAuth: true } },
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const adminLogado = localStorage.getItem('adminLogado') === 'true';
  if (to.meta.requiresAuth && !adminLogado) {
    next('/admin');
  } else {
    next();
  }
});

export default router
