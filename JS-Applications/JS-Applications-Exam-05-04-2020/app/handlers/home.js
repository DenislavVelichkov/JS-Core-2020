import { applyCommon } from './common.js';
import { requester } from '../services/authService.js';

export async function homeViewHandler() {
    /**
     * Load hbs templates
     */
    await applyCommon.call(this);

    toastr.warning("Loading...")
    let articles = await requester.asset.getAll();
    toastr.clear()

    this.asset = Object.entries(articles || {}).map(([articleId, article]) => ({...article, articleId}));

    this.loggedInWithArticles = sessionStorage.getItem('token') && this.asset.length > 0;

    this.loggedInWithNoArticles = sessionStorage.getItem('token') && this.asset.length === 0;

    this.partial('./templates/home/home.hbs');
}
