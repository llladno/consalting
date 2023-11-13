
if (!sessionStorage.getItem('id')){
    window.location.href = './..'
}
console.log(sessionStorage.getItem('id'))


function serviceBtn(event, serviceName) {

    let data = {}
    if (serviceName === 'accounting'){
        data = {
            name: 'Бухгалтерия',
            price: 1500,
            description: 'Описание',
        }
    } else if (serviceName === 'marketing') {
        data = {
            name: 'Маркетинговые услуги',
            price: 2000,
            description: '',
        }
    } else if (serviceName === 'hr') {
        {
            data = {
                name: 'Кадровые услуги',
                price: 2000,
                description: '',
            }
        }
    } else {
        {
            data = {
                name: 'Антикризисные бизнес стратегии',
                price: 3000,
                description: '',
            }
        }
    }
    let dataToSend = {
        name: serviceName,
        price: data.price,
        description: data.description,
    }
    console.log(dataToSend)
    console.log(data)
    let place = document.getElementsByClassName('mainPlace')[0]

    place.innerHTML =`
    <div>
    <h2>Название услуги</h2>
    <p>${data.name}</p>
    <h2>Цена</h2>
    <p>${data.price}</p>
    <h2>Описание</h2>
    <p>${data.description}</p>
    <div>
    <button onclick="addToBasket('${serviceName}')">Добавить услугу в карзину</button>
    <button onclick="sendRequest('${serviceName}',${data.price},'${data.description}')">Заказать услугу</button>
</div>
</div>`
}

async function sendRequest(name,price,description){
    let body = {
            servicename: name,
            price: price,
            description: description
    }
    let response = (await fetch('http://localhost:3005/add/service', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    }));
    let json = await response.json()
}

function addToBasket(serviceName){
    let item = sessionStorage.getItem(`${serviceName}`)
    item === null ? sessionStorage.setItem(serviceName,serviceName)
        : null
}