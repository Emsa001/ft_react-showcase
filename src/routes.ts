const routes = [
    { path: '/', module: () => import('./app/home/page') },
    { path: "404", module: () => import('./app/404') }
];

export default routes;