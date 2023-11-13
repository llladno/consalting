async function getOrdersCheck(){
    let mainPlace = document.getElementsByClassName('mainPlace')[0]
    let response = await fetch('http://localhost:3005/client/getOrdersCheck',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({id:sessionStorage.getItem('id')})
    }).then((x)=>{
            let json = x.json()
            console.log(json)
            return json
        }
    ).then((y)=>{
        console.log(y)
        return y
    })

    mainPlace.innerHTML = `
    <h2>Счета к оплате</h2>
`


    Array.from(response.data).map((x)=>{
        mainPlace.innerHTML += `
        <h4>Номер счёта: ${x.idordercheck}</h4>
<p>Дата выставления счёта: ${x.dateordercheck}</p>
<p>ID услуг(и): ${x.idorder}</p>
<p>№ Заказа: ${x.orderwrite}</p>
<p>Сумма к оплате: ${x.sumordercost}</p>
<button onclick="payOrderCheck(${x.orderwrite})">Оплатить</button>`
    })
}


async function payOrderCheck (orderwrite){
    console.log(orderwrite)
    let response = await fetch('http://localhost:3005/client/payOrdersCheck',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({orderwrite: orderwrite,user: sessionStorage.getItem('id')})
    }).then((x)=>{
            let json = x.json()
            console.log(json)
            return json
        }
    ).then((y)=>{
        console.log(y)
        return y
    })
}


async function getReport(){
    let mainPlace = document.getElementsByClassName('mainPlace')[0]
    let response = await fetch('http://localhost:3005/client/getReport',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({id:sessionStorage.getItem('id')})
    }).then((x)=>{
            let json = x.json()
            console.log(json)
            return json
        }
    ).then((y)=>{
        console.log(y)
        return y
    })

    mainPlace.innerHTML = `
    <h2>Счета к оплате</h2>
`


    Array.from(response.data).map((x)=>{
        mainPlace.innerHTML += `
        <h4>Номер счёта: ${x.idordercheck}</h4>
<p>Дата выставления счёта: ${x.dateordercheck}</p>
<p>ID услуг(и): ${x.idorder}</p>
<p>№ Заказа: ${x.orderwrite}</p>
<p>Сумма к оплате: ${x.sumordercost}</p>
<button onclick="payOrderCheck(${x.orderwrite})">Оплатить</button>`
    })
}