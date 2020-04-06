import {applyCommon} from './common.js';
import {requester} from '../services/authService.js';

export async function homeViewHandler() {

    await applyCommon.call(this);

    let loggedIn = !!sessionStorage.getItem('token');

    if(!loggedIn) {
        this.redirect("#/login")
    }

    toastr.warning("Loading...");
    let articles = await requester.asset.getAll();
    toastr.clear();

    this.cSharpArticles = Object.entries(articles || {})
    .filter(a => a[1].category === "C#")
    .sort((a,b) => String(b[1].title).localeCompare(String(a[1]).title))
    .map(([articleId, article]) => ({articleId, ...article}));

    this.javaArticles = Object.entries(articles || {})
    .filter(a => a[1].category === "Java")
    .sort((a,b) => String(b[1].title).localeCompare(String(a[1]).title))
    .map(([articleId, article]) => ({articleId, ...article}));

    this.javaScriptArticles = Object.entries(articles || {})
    .filter(a => a[1].category === "JavaScript")
    .sort((a,b) => String(b[1].title).localeCompare(String(a[1]).title))
    .map(([articleId, article]) => ({articleId, ...article}));

    this.pytonArticles = Object.entries(articles || {})
    .filter(a => a[1].category === "Pyton")
    .sort((a,b) => String(b[1].title).localeCompare(String(a[1]).title))
    .map(([articleId, article]) => ({articleId, ...article}));

    this.partial('./templates/home/home.hbs');
}
