import {requester} from '../services/authService.js';

export async function deleteHandler() {

    await requester.asset.deleteEntity(this.params.id);

    toastr.success("You deleted the article successfully.") ;

    this.redirect('#/home');
}