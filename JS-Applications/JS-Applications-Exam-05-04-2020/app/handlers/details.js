import {applyCommon} from './common.js';
import {requester} from '../services/authService.js';

export async function detailsHandler() {

    let {
        createdByName,
        title,
        content,
        category
    } = await requester.asset.getById(this.params.id);

    this.articleId = this.params.id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.createdByName = createdByName;
    this.userIsCreator = sessionStorage.getItem('email') === createdByName;

    /**
     * Load hbs templates
     */
    await applyCommon.call(this);
    this.partial('./templates/details/details.hbs');
}