import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          component: '@/pages/Home',
        },
        {
          path: '/template/:id',
          component: '@/pages/Template',
        },
        {
          path: '/editor',
          component: '@/pages/Editor',
        },
      ],
    },
    { component: '@/pages/404' },
  ],
  fastRefresh: {},
});
