const routes = [
    { path: '/', module: () => import('./app') },
    { path: '/test', module: () => import('./app/test') },
];

export default routes;