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

function registration (){
    let inputs = document.getElementsByTagName('input')
    let mass = []
    Array.from(inputs).forEach((x)=>{
        if (x.value === '') return 0
        mass.push(x.value)
    })
    if (mass.length < 9 || mass[7] !== mass[8]){
        console.log('error')
        //error дописать
    }
    let data = {
        surname: mass[0],
        name: mass[1],
        parent: mass[2],
        email: mass[3],
        phone: mass[4],
        nameCompany: mass[5],
        addressCompany: mass[6],
        passwd: mass[7]
    }
    console.log(data)
}