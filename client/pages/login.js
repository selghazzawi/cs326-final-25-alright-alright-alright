import * as crud from '../crud.js';
const signin = document.getElementById('signIn')
const signup = document.getElementById('signUp')

signin.addEventListener('click', async () => {
    const email = document.getElementById('form3Example3cg').value
    const password = document.getElementById('form3Example4cg').value
    const data = await crud.login(email, password)
    if (data.status === 500) {
        alert("incorrect username or password")
        return
    }
    location.href = 'http://localhost:8080/client/pages/landingPageLogIn/'
    localStorage.setItem('email', JSON.stringify(email))
})

signup.addEventListener('click', () => {
    location.href = 'http://localhost:8080/client/pages/signup/'
})