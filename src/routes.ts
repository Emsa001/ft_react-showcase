const routes = [
    { path: '/', module: () => import('./app') },
    { path: '/test', module: () => import('./app/test') },
    { path: "404", module: () => import('./app/404') }
];

export default routes;