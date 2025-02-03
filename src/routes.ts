const routes = [
    { path: '/', module: () => import('./app') },
    { path: "404", module: () => import('./app/404') }
];

export default routes;