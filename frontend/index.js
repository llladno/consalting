async function loginBtn(){
    login = document.getElementById('login')
    password = document.getElementById('password')
    const body = {
        login: login.value,
        passwd: password.value
    }
    if (login.value.length && password.value.length !== 0){
        //Запрос
        console.log(body)
        console.log('login valid')
        const response = await fetch('http://localhost:3005/user/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        })
        if(await response.status === 200){
            sessionStorage.setItem('login',body.login)
            window.location.href = 'client/client.html'
        }
    } else {
        document.getElementsByClassName('notCorrect')[0].innerHTML = `<p>
    Заполните все поля!
</p>`
    }
}

async function registration (){
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


    let response = await fetch('http://localhost:3005/user/registration',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    console.log(response)
    console.log(data)
}