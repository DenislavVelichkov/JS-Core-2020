import { applyCommon } from './common.js';
import { createFormEntity } from '../utils/formData.js';
import { requester } from '../services/authService.js';
import { NO_VALUE } from '../utils/constants.js';

// export async function joinTeamHandler() {
//     /**
//      * Get data about the team the user wants to join
//      * -- this.params comes from the url
//      */
//     let team = await requester.asset.getById(this.params.id);
//     /**
//      * Updates the user meta data with the id of the team he/she joins
//      * Updates the teamsData with the id and the name of the user that is joining
//      */
//     await requester.asset.patchEntity({ team: this.params.id }, sessionStorage.getItem('userId'));
//     await requester.asset.patchEntity(
//         {
//             teamMembers: [...(team.teamMembers || []),
//             {
//                 name: sessionStorage.getItem('username'),
//                 id: sessionStorage.getItem('userId')
//             }
//             ]
//         },
//         this.params.id
//     );
//     /**
//      * Navigates back to the catalog details
//      */
//     this.redirect(`#/catalog/${this.params.id}`);
// }

// export async function leaveTeamHandler() {
//     /**
//      * Get data about the team the user wants to leave
//      * -- this.params comes from the url
//      */
//     let team = await requester.asset.getById(this.params.id);

//     /**
//      * Updates the user meta data with the id of the team he/she leave
//      * Removes from teamsData the leaving user
//      */
//     await requester.asset.patchEntity({ team: NO_VALUE, createdTeams: NO_VALUE }, sessionStorage.getItem('userId'));
//     await requester.asset.patchEntity(
//         {
//             teamMembers: [
//                 ...(team.teamMembers || [])
//                     .filter(teamMember => teamMember.id !== sessionStorage.getItem('userId'))
//             ]
//         },
//         this.params.id
//     );
//     /**
//      * Navigates back to the catalog details
//      */
//     this.redirect(`#/catalog/${this.params.id}`);
// }

export async function createTrekHandler() {
    /**
     * Load hbs templates
     */
    await applyCommon.call(this);

    await this.partial('./templates/create/createPage.hbs');

    /**
     * Handling form events part
     */
    let formRef = document.querySelector('form');
    formRef.addEventListener('submit', async e => {
        e.preventDefault();

        let form = createFormEntity(formRef, ['location', 'dateTime', 'description', 'imageURL']);
        let formValue = form.getValue();

        formValue.createdById = sessionStorage.getItem('userId');
        formValue.createdByName = sessionStorage.getItem('email');
        formValue.likes = 0;

        if (formValue.location.length < 6) {

            throw new Error(toastr.error("Location name must be atleast 6 characters long."));
        }

        if (formValue.description.lenght < 10) {

            throw new Error(toastr.error("Location name must be atleast 10 characters long."));
        }

        await requester.asset.createEntity(formValue);
        toastr.success("Trek created successfully.")

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
    let form = createFormEntity(formRef, ['location', 'dateTime', 'description', 'imageURL']);

    /**
     * Load and set the initial form value for edit
     */
    const trekToEdit = await requester.asset.getById(this.params.id);
    form.setValue(trekToEdit);

    formRef.addEventListener('submit', async e => {
        e.preventDefault();
        let form = createFormEntity(formRef, ['location', 'dateTime', 'description', 'imageURL']);
        let formValue = form.getValue();

        toastr.success("Trek edited successfully.");

        await requester.asset.patchEntity(formValue, this.params.id);

        this.redirect(['#/home']);
    });
}
