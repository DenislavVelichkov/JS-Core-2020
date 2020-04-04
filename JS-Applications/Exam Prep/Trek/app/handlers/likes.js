import { requester } from '../services/authService.js';

export async function likesHandler() {

    await requester.asset.patchEntity({
        likes: Number(this.params.currentLikes) + 1
    }, this.params.id);

    toastr.success("You liked the trek successfully.")

    this.redirect(`#/details/${this.params.id}`);

    return false;
}