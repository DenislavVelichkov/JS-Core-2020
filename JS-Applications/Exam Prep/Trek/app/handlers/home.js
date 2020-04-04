import { applyCommon } from './common.js';
import { requester } from '../services/authService.js';

export async function homeViewHandler() {
    /**
     * Load hbs templates
     */
    await applyCommon.call(this);

    toastr.warning("Loading...")
    let treks = await requester.asset.getAll();
    toastr.clear()

    this.asset = Object.entries(treks || {}).map(([trekId, trek]) => ({...trek, trekId}));

    this.loggedInWithTreks = sessionStorage.getItem('token') && this.asset.length > 0;

    this.loggedInWithNoTreks = sessionStorage.getItem('token') && this.asset.length === 0;

    this.partial('./templates/home/home.hbs');
}
