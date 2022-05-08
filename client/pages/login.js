import * as crud from '../crud.js';
const button = document.getElementById('signIn')

button.addEventListener('click', async () => {
    const email = document.getElementById('form3Example3cg').value
    const password = document.getElementById('form3Example4cg').value
    try {
    const data = await crud.login(email, password)
    location.href = 'http://localhost:8080/client/pages/landingPageLogIn/'
    localStorage.setItem('email', JSON.stringify(email))
    } catch (err) {
        alert(err)
    }
})