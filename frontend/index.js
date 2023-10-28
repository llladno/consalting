function loginBtn(){
    login = document.getElementById('login')
    password = document.getElementById('password')

    if (login.value.length && password.value.length !== 0){
        //Запрос
    } else {
        document.getElementsByClassName('notCorrect')[0].innerHTML = `<p>
    Заполните все поля!
</p>`
    }
}