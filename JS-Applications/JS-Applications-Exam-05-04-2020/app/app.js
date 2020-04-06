import {requester} from './services/authService.js';
import {
    createAssetHandler,
    deleteHandler,
    detailsHandler,
    editHandler,
    homeViewHandler,
    loginHandler,
    logoutHandler,
    registerViewHandler
} from './handlers/index.js';

const apiKey = 'https://exam-e8076.firebaseio.com/';
requester.init(apiKey, sessionStorage.getItem('token'));

const app = Sammy('#main', function () {

    this.use('Handlebars', 'hbs');

    this.get('#/', homeViewHandler);
    this.get('#/home', homeViewHandler);

    this.get('#/register', registerViewHandler);
    this.post('#/register', () => false);

    this.get('#/logout', logoutHandler);

    this.get('#/login', loginHandler);
    this.post('#/login', () => false);K

    this.get('#/create', createAssetHandler);
    this.post('#/create', () => false);

    this.get('#/details/:id', detailsHandler);

    this.get('#/edit/:id', editHandler);
    this.post('#/edit/:id', () => false);

    this.get('#/delete/:id', deleteHandler);
});

app.run('#/');
