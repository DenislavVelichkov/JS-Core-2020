/**
 * Factory that returns object with function invoking CRUD operation over firebase database
 * @param {string} apiKey firebase database url
 * @param {string} collectionName entity name
 */
export const RestClient = (apiKey, collectionName, token) => {
    if (!apiKey) {
        throw new Error('You must provide api key');
    }

    if (!apiKey.endsWith('/')) {
        throw new Error('The api key must end with "/"');
    }

    let collectionUrl = apiKey + collectionName;

    /**
     * Returns all elements from firebase database collection
     */
    const getAll = () => {
        return fetch(collectionUrl + '.json' + (token ? `?auth=${token}`:''))
        .then(x => {
            toastr.warning("Loading")
            return x.json();
        }).then(() => toastr.clear());
    };

    /**
     * Based on id returns one element from firebase database collection
     * @param {string} id
     */
    const getById = (id) => {
        return fetch(`${collectionUrl}/${id}.json`+ (token ? `?auth=${token}`:''))
        .then(x => {
            toastr.warning("Loading")
            return x.json();
        }).then(() => toastr.clear());
    };

    /**
     * Receive any javascript and creates entity in pre configured collection
     * @param {{[key:string]: any}} entityBody javascript object
     */
    const createEntity = (entityBody) => {
        return fetch(collectionUrl + '.json'+ (token ? `?auth=${token}`:''), {
            method: 'POST',
            body: JSON.stringify(entityBody)
        }).then(x => {
            toastr.warning("Loading")
            return x.json();
        }).then(() => toastr.clear());
    };

    /**
     * Receive any javascript and overrides entity in pre configured collection based on the provided Id
     * @param {{[key:string]: any}} entityBody
     * @param {string} id
     */
    const updateEntity = (entityBody, id) => {
        return fetch(`${collectionUrl}/${id}.json`+ (token ? `?auth=${token}`:''), {
            method: 'PUT',
            body: JSON.stringify(entityBody)
        }).then(x => {
            toastr.warning("Loading")
            return x.json();
        }).then(() => toastr.clear());
    };

    /**
     * Receive any javascript and updates entity in pre configured collection based on the provided Id
     * @param {{[key:string]: any}} entityBody
     * @param {string} id
     */
    const patchEntity = (entityBody, id) => {
        return fetch(`${collectionUrl}/${id}.json`+ (token ? `?auth=${token}`:''), {
            method: 'PATCH',
            body: JSON.stringify(entityBody)
        }).then(x => {
            toastr.warning("Loading")
            return x.json();
        }).then(() => toastr.clear());
    };

    /**
     * Based on id deletes entity in pre configured collection
     * @param {string} id
     */
    const deleteEntity = (id) => {
        return fetch(`${collectionUrl}/${id}.json`+ (token ? `?auth=${token}`:''), {
            method: 'DELETE'
        }).then(x => {
            toastr.warning("Loading")
            return x.json();
        }).then(() => toastr.clear());
    };

    return {
        getAll,
        getById,
        createEntity,
        updateEntity,
        patchEntity,
        deleteEntity
    };
};
