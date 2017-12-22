import Vue from 'vue';
import VueRouter from 'vue-router';
import Welcome from './pages/Welcome.vue';
import Analyse from './pages/Analyse.vue';
import Data from './pages/Data.vue';
import News from './pages/News.vue';
import Error404 from './pages/Error404.vue';

Vue.use(VueRouter);

export const AppRouter = new VueRouter({
  routes: [
    { path: '/', component: Welcome }, // Default
    { path: '/data', component: Data }, 
    { path: '/news', component: News }, 
    { path: '/analyse', component: Analyse },
    { path: '*', component: Error404 } // Not found
  ]
});

export default AppRouter;