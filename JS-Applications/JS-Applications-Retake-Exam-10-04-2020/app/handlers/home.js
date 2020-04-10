import {applyCommon} from './common.js';
import {requester} from '../services/authService.js';

export async function homeViewHandler() {

    await applyCommon.call(this);
    this.userName = sessionStorage.getItem("email");

    toastr.warning("Loading...");
    let posts= await requester.asset.getAll();
    toastr.clear();

    this.posts = Object.entries(posts || {})
    .map(([postId, post]) => ({postId, ...post}));

    this.partial('./templates/home/home.hbs');
}