import { RestClient } from '../repository/firebaseRepository.js';
import { ASSET_NAME } from '../utils/constants.js';

/**
 * Creates object that support CRUD operations over set of entities
 */
export const requester = (() => {
    let _asset;
    let apiKey;

    /**
     * Updates the auth token which is applied to the requests
     * @param {string} token firebaseAuthToken
     */
    let setAuthToken = (token) => {
        _asset = RestClient(apiKey, ASSET_NAME, token);
    };

    /**
     * Initialize singleton request objet to be used across the application
     * @param {string} firebaseApiKey sets the firebaseApiKey to which we will make requests
     * @param {string} token optionally sets the auth token
     */
    let init = (firebaseApiKey,token = null) => {
        apiKey = firebaseApiKey;
        _asset = RestClient(apiKey, ASSET_NAME, token);
    };

    /**
     * Return all supported collection + config functions
     */
    return {
        init,
        setAuthToken,
        _asset: _asset,
        get asset(){
            return _asset
        },
    };
})();
