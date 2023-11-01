async function getOrders() {
    let services =['accounting','marketing', "hr", 'strategy']
    let basket = []
    for (let b in services){
        if (sessionStorage.getItem(services[b]) !== null){
            basket.push(sessionStorage.getItem(services[b]))
        }
    }

    await getOrdersFromBD()

    let mainPlace = document.getElementsByClassName('mainPlace')[0]
    if (basket.length !== 0){
        mainPlace.innerHTML = `
    <h2>Ваша корзина</h2>
    <p>Перечень услуг: 
${basket.map((x)=>{
            if (x === 'accounting') x = 'Бухгалтерское обслуживание'
            else if(x === 'marketing') x = 'Маркетинговые услуги'
            else if (x === 'hr') x = 'Кадровые услуги'
            else x = 'Антикризисные стратегии'
            return x
        })}</p>
<button onclick="toOrder()">Заказать</button>`
    } else {
        mainPlace.innerHTML = `<p>Выберите услуги</p>`
    }

    console.log(basket)
}

async function getOrdersFromBD() {
    let response = await fetch('http://localhost:3005/client/getServices',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({login:'test'})
    }).then((x)=>{
        let json = x.json()
        console.log(json)
        return json
        }
    ).then((y)=>{
        console.log(y)
    })
    console.log(response)
    console.log(await response)
}

async function toOrder (){
    console.log('basket')
    let services =['accounting','marketing', "hr", 'strategy']
    let basket = []
    let dataTosend = []
    for (let b in services){
        if (sessionStorage.getItem(services[b]) !== null){
            basket.push(sessionStorage.getItem(services[b]))
        }
    }

    basket.forEach((x)=>{
        if (x === 'accounting'){
            dataTosend.push(data = {
                name: x,
                price: 1500,
                description: 'Описание',
            })
        } else if (x === 'marketing') {
            dataTosend.push(data = {
                name: x,
                price: 2000,
                description: '',
            })
        } else if (x === 'hr') {
            {
                dataTosend.push(data = {
                    name: x,
                    price: 2000,
                    description: '',
                })
            }
        } else {
            {
                dataTosend.push(data = {
                    name: x,
                    price: 3000,
                    description: '',
                })
            }
        }
    })

    let response = await fetch('http://localhost:3005/client/setServices',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(dataTosend)
    })

    console.log(dataTosend)
    console.log(basket)

}