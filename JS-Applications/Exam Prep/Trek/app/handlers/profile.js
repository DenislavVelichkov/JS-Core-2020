import { applyCommon } from './common.js';
import { requester } from '../services/authService.js';

export async function profileHandler() {
    /**
     * Load hbs templates
     */
    await applyCommon.call(this);
    const userEmail = sessionStorage.getItem("email");

    let personalTreks = await requester.asset.getAll();

    this.asset = Object.entries(personalTreks || {})
        .filter(t => t[1].createdByName === userEmail)
        .map(([trekId, trek]) => ({ ...trek, trekId }));

    this.partial('./templates/profile/profile.hbs');
}