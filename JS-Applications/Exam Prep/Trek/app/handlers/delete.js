import { requester } from '../services/authService.js';
export async function deleteHandler() {

    await requester.asset.deleteEntity(this.params.id);

    this.redirect('#/home');
}