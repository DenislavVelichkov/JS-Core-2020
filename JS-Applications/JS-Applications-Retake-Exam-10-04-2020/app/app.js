import { requester } from './services/authService.js'
import {
  deleteHandler,
  detailsHandler,
  editHandler,
  homeViewHandler,
  loginHandler,
  logoutHandler,
  registerViewHandler
} from './handlers/index.js'

const apiKey = 'https://exam-e8076.firebaseio.com/'
requester.init(apiKey, sessionStorage.getItem('token'))

const app = Sammy('#root', function () {
  this.use('Handlebars', 'hbs')

  this.get('#/', homeViewHandler)
  this.get('#/home', homeViewHandler)

  this.get('#/register', registerViewHandler)
  this.post('#/register', () => false)

  this.get('#/logout', logoutHandler)

  this.get('#/login', loginHandler)
  this.post('#/login', () => false)

  this.post('#/create-post', async function (ctx) {
    let formRef = document.querySelector('.background-container form')

    formRef.addEventListener('submit', e => {
        console.log("Hello")
      let form = createFormEntity(formRef, ['title', 'category', 'content'])
      let formValue = form.getValue()

      formValue.createdByName = sessionStorage.getItem('email')

      requester.asset.createEntity(formValue)
      toastr.success('Post created successfully.')

      form.clear()

      ctx.redirect(['#/home'])
    })
  })

  this.get('#/details/:id', detailsHandler)

  this.get('#/edit/:id', editHandler)
  this.post('#/edit/:id', () => false)

  this.get('#/delete/:id', deleteHandler)
})

app.run('#/')
