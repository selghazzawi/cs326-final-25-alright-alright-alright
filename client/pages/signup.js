import * as crud from '../crud.js';
const signup = document.getElementById('signup')
const name1 = document.getElementById('form3Example1cg')
const email = document.getElementById('form3Example3cg')
const password1 = document.getElementById('form3Example4cg')
const password2 = document.getElementById('form3Example4cdg')

console.log('hi')

signup.addEventListener('click', async () => {
    if (name1.value === '' || email.value === '' || password1.value === '' || password2.value === '') {
        alert('please fill out all boxes')
        return
    }
    if (password1.value !== password2.value) {
        alert('passwords dont match')
        return
    }
    const data = await crud.checkUserExist(email.value)
    if (data.status === 200) {
        alert('email already in use')
        return
    }
    await crud.signUp(email.value, password1.value)
    location.href = 'http://localhost:8080/client/pages/landingPageLogIn/'
    localStorage.setItem('email', JSON.stringify(email.value))
})