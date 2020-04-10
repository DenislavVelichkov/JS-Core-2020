import {applyCommon} from './common.js';
import {createFormEntity} from '../utils/formData.js';
import {requester} from '../services/authService.js';

export function createAssetHandler() {

    // await applyCommon.call(this);

    // await this.partial('./templates/create/createPage.hbs');
    console.log("hello")
    let formRef = document.querySelector('.background-container form');
    formRef.addEventListener('submit', async e => {
        // e.preventDefault();

        let form = createFormEntity(formRef, ['title', 'category', 'content']);
        let formValue = form.getValue();

        formValue.createdByName = sessionStorage.getItem('email');

        requester.asset.createEntity(formValue);
        toastr.success("Post created successfully.");

        form.clear();

        this.redirect(['#/home']);
    });
}

export async function editHandler() {
    /**
     * Load hbs templates
     */
    await applyCommon.call(this);
    await this.partial('./templates/edit/editPage.hbs');

    /**
     * Handling form events part
     */
    let formRef = document.querySelector('form');
    let form = createFormEntity(formRef, ['title', 'category', 'content']);

    /**
     * Load and set the initial form value for edit
     */
    const articleToEdit = await requester.asset.getById(this.params.id);
    form.setValue(articleToEdit);

    formRef.addEventListener('submit', async e => {
        e.preventDefault();
        let form = createFormEntity(formRef, ['title', 'category', 'content']);
        let formValue = form.getValue();

        toastr.success("Post edited successfully.");

        await requester.asset.patchEntity(formValue, this.params.id);

        this.redirect(['#/home']);
    });
}
