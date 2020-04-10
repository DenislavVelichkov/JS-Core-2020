import {createFormEntity} from '../utils/formData.js';
import {applyCommon} from './common.js';
import {requester} from '../services/authService.js';

export async function loginHandler() {

    await applyCommon.call(this);
    await this.partial('./templates/login/loginPage.hbs');

    let formRef = document.querySelector('.login-form form');
    formRef.addEventListener('submit', async e => {
        e.preventDefault();

        let form = createFormEntity(formRef, ['email', 'password']);
        let formValue = form.getValue();


        const loggedInUser = await firebase.auth().signInWithEmailAndPassword(formValue.email, formValue.password)
            .catch(() => toastr.error(new Error("Incorrect credentials!")));

        const userToken = await firebase.auth().currentUser.getIdToken();
        sessionStorage.setItem('email', loggedInUser.user.email);
        sessionStorage.setItem('userId', firebase.auth().currentUser.uid);


        sessionStorage.setItem('token', userToken);
        requester.setAuthToken(userToken);

        toastr.success("Successfully logged in!")

        this.redirect(['#/home']);
    });
}


export async function registerViewHandler() {

    await applyCommon.call(this);
    await this.partial('./templates/register/registerPage.hbs');


    let formRef = document.querySelector('form');
    formRef.addEventListener('submit', async (e) => {
        e.preventDefault();

        let form = createFormEntity(formRef, ['email', 'password', 'repeatPassword']);
        let formValue = form.getValue();
        const emailValidation = new RegExp(/[a-zA-Z0-9_]{3,}@[A-Za-z0-9_]+.?-?[a-zA-Z0-9]+/gm);

        if (formValue.password !== formValue['repeatPassword']) {
            throw new Error(toastr.error('Password and repeat password must match'));
        }

        if (!emailValidation.test(formValue.email)) {
            throw new Error(toastr.error('That does not seems like a valid email address!'));
        }

        if (formValue.password.length < 6) {
            throw new Error(toastr.error('Password must be atleast 6 characters long!'));
        }

        toastr.success("Successfully registered user!")

        const newUser = await firebase.auth().createUserWithEmailAndPassword(formValue.email, formValue.password);

        let userToken = await firebase.auth().currentUser.getIdToken();
        sessionStorage.setItem('email', newUser.user.email);
        sessionStorage.setItem('userId', firebase.auth().currentUser.uid);

        sessionStorage.setItem('token', userToken);

        requester.setAuthToken(userToken);

        this.redirect(['#/home']);
    });

}

export function logoutHandler() {
    sessionStorage.clear();
    firebase.auth().signOut()

    toastr.success("Logout successful.")

    this.redirect(['#/home']);
}