import Home from './views/Home';

const defineRoutes = (app) => {
    app.get('/', Home);
}

export {defineRoutes};
