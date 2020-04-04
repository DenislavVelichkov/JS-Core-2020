import { requester } from '../services/authService.js';

export async function likesHandler() {

    await requester.asset.patchEntity({
        likes: Number(this.params.currentLikes) + 1
    }, this.params.id);

    this.redirect(`#/details/${this.params.id}`);

    return false;
}