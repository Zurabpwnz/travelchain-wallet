import Vue from 'vue';
import VueRouter from 'vue-router';
import Welcome from './pages/Welcome.vue';
import Analyse from './pages/Analyse.vue';
import Data from './pages/Data.vue';
import News from './pages/News.vue';
import Purchase from './pages/Purchase.vue';
import Error404 from './pages/Error404.vue';
import SignIn from './pages/SignIn.vue';

Vue.use(VueRouter);

export const AppRouter = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Welcome },
    { path: '/sign-in', component: SignIn },
    { path: '/data', component: Data }, 
    { path: '/purchase', component: Purchase },
    { path: '/news', component: News }, 
    { path: '/analyse', component: Analyse },
    { path: '*', component: Error404 }
  ]
});

export default AppRouter;