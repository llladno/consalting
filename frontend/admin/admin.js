async function tableset(tableName){
    console.log(tableName)
    let tablePlace = document.getElementsByClassName('tablePlace')[0]
    let th = []
    let thService = ["ID",'ID Сотрудника', "Название услуги","Стоимость услуги", "Описание","Удалить","Редактировать"]
    if (tableName === 'mainorder') th = ['ID', 'ID Клиента', 'ID Свервиса', 'Описание', "Сумма", 'Дата',"Удалить","Редактировать"]
    else if (tableName === 'client') th = ['ID', 'Фамилия', "Имя", "Отчество","Название компании","Адрес компании", "Почта", "Телефон","Пароль","Удалить","Редактировать"]
    else if (tableName === 'employee') th = ['ID',"Фамилия","Имя","Отчество","Почта","Телефон","Вид деятельности", "Пароль","Удалить","Редактировать"]
    else if (tableName === 'service') th = ["ID",'ID Сотрудника', "Название услуги","Стоимость услуги", "Описание","Удалить","Редактировать"]
    else if (tableName === 'report') th = ["ID",'ID Услуги', "Дата отчёта","Готовность отчёта", "Готовность услуги","Пусть к файлу","Удалить","Редактировать"]
    else if (tableName === 'ordercheck') th = ["ID", "ID Клиента","ID Заказа", "Дата выставления счёта", "Дата оплаты счёт", "Сумма счёта", "Статус","Удалить","Редактировать"]
    let response = await fetch('http://localhost:3005/admin/getTable',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({table: tableName})
    }).then((x)=>{
            let json = x.json()
            console.log(json)
            return json
        }
    ).then((y)=>{
        console.log(y)
        return y
    })
if ((tableName === 'mainorder') || (tableName === 'ordercheck') || (tableName === 'report')) {
    tablePlace.innerHTML = `<div class="addinfo"><h2>Добавить информацию в таблицу</h2>
<button class="addBtn" onclick="add('service', '${thService}')">Добавить</button>
</div>
    <table class="tableClass"><tr class="headtr"></tr></table>`
}
else {
    tablePlace.innerHTML = `<div class="addinfo"><h2>Добавить информацию в таблицу</h2><button class="addBtn"
onclick="add('${tableName}', '${th}')">Добавить</button></div>
    <table  class="tableClass"><tr class="headtr"></tr></table>`
}

    let tableClass = document.getElementsByClassName('tableClass')[0]
    let headtr = document.getElementsByClassName('headtr')[0]
    th.map((x)=>{
        headtr.innerHTML += `<th>${x}</th>`
    })

    console.log(response.data.length)

    if (tableName === 'mainorder') response.data.map((x)=>{
        tableClass.innerHTML += `<tr>
<td>${x.orderwrite}</td>
<td>${x.idclient}</td>
<td>${x.idservice}</td>
<td>${x.descriptionorder}</td>
<td>${x.costorder}</td>
<td>${x.dateorder}</td>
<td class="${x.orderwrite}"><button class="delete" onclick="deleteInfo(event, ${x.orderwrite},'${tableName}')">Удалить</button></td>
<td class="${x.orderwrite}"><button class='change' onclick="ChangeInfo(event, ${x.orderwrite},'${tableName}', '${th}')">Изменить</button></td>
</tr>`
    })

    else if (tableName === 'client') response.data.map((x)=>{
        tableClass.innerHTML += `<tr>
<td>${x.idclient}</td>
<td>${x.surname}</td>
<td>${x.clientname}</td>
<td>${x.parent}</td>
<td>${x.companyname}</td>
<td>${x.addresscompany}</td>
<td>${x.email}</td>
<td>${x.phone}</td>
<td>${x.passwd}</td>
<td class="${x.idclient}"><button class="delete" onclick="deleteInfo(event, ${x.idclient}, '${tableName}')">Удалить</button></td>
<td class="${x.idclient}"><button class='change' onclick="ChangeInfo(event, ${x.idclient},'${tableName}', '${th}')">Изменить</button></td>
</tr>`
    })
    else if (tableName === 'employee') response.data.map((x)=>{
        console.log(x)
        tableClass.innerHTML += `<tr>
<td>${x.idemployee}</td>
<td>${x.surname}</td>
<td>${x.fname}</td>
<td>${x.thrname}</td>
<td>${x.mail}</td>
<td>${x.phone}</td>
<td>${x.activity}</td>
<td>${x.passwd}</td>
<td class="${x.idemployee}"><button class="delete" onclick="deleteInfo(event, ${x.idemployee},'${tableName}')">Удалить</button></td>
<td class="${x.idemployee}"><button class='change' onclick="ChangeInfo(event, ${x.idemployee},'${tableName}', '${th}')">Изменить</button></td>
</tr>`
    })
    else if (tableName === 'service') response.data.map((x)=>{
        console.log(x)
        tableClass.innerHTML += `<tr>
<td>${x.idserice}</td>
<td>${x.idemployee}</td>
<td>${x.nameservice}</td>
<td>${x.costservice}</td>
<td>${x.descriptionservice}</td>
<td class="${x.idserice}"><button class="delete" onclick="deleteInfo(event, ${x.idserice},'${tableName}')">Удалить</button></td>
<td class="${x.idserice}"><button class='change' onclick="ChangeInfo(event, ${x.idserice},'${tableName}', '${th}')">Изменить</button></td>
</tr>`
    })

    else if (tableName === 'report') response.data.map((x)=>{
        console.log(x)
        tableClass.innerHTML += `<tr>
<td>${x.idreport}</td>
<td>${x.idservice}</td>
<td>${x.datereport}</td>
<td>${x.readyreport}</td>
<td>${x.readyservice}</td>
<td>${x.filepath}</td>
<td class="${x.idreport}"><button class="delete" onclick="deleteInfo(event, ${x.idreport},'${tableName}')">Удалить</button></td>
<td class="${x.idreport}"><button class='change' onclick="ChangeInfo(event, ${x.idreport},'${tableName}', '${th}')">Изменить</button></td>
</tr>`
    })

    else if (tableName === 'ordercheck') response.data.map((x)=>{
        console.log(x)
        tableClass.innerHTML += `<tr>
<td>${x.orderwrite}</td>
<td>${x.idclient}</td>
<td>${x.idorder}</td>
<td>${x.dateordercheck}</td>
<td>${x.dateorderpay}</td>
<td>${x.sumordercost}</td>
<td>${x.statusordercheck}</td>
<td class="${x.orderwrite}"><button class="delete" onclick="deleteInfo(event, ${x.orderwrite},'${tableName}')">Удалить</button></td>
<td class="${x.orderwrite}"><button class='change' onclick="ChangeInfo(event, ${x.orderwrite},'${tableName}', '${th}')">Изменить</button></td>
</tr>`
    })
}


function add(name, th){
    console.log(name)
    console.log(th)
    let tablePlace = document.getElementsByClassName('tablePlace')[0]
    let elements = th.split(',')
    tablePlace.innerHTML = ``
    if (name === 'service'){
        tablePlace.innerHTML += `
        <p>ID Клиента</p> <input class="info">
        <p>Услуга</p><select name="service" id="service" class="info">
        <option>hr</option>
        <option>accounting</option>
        <option>strategy</option>
        <option>marketing</option>
</select>
<p>Стоимость</p><input class="info">  
<p>Описание</p><input class="info">      
        `
    } else {
        elements.map((x)=>{
            console.log(x)
            if (x!=='ID' && x!== 'Удалить'){
                tablePlace.innerHTML += `<div class="inputdiv">
<p>${x}</p><input class="info">
</div>`
            }
        })
    }




    tablePlace.innerHTML += `<button onclick="send('${name}')">Отправить</button>`

    console.log(name)

}

async function send(name) {
    let info = document.getElementsByClassName('info')
    let sendArr = []
    Array.from(info).forEach((x) => {
        sendArr.push(x.value)
    })
    console.log(sendArr)
    let sendData
    let query


    if (name === 'client')    sendData = {
        surname: info[0].value,
        clientname: info[1].value,
        parent: info[2].value,
        companyname: info[3].value,
        addresscompany: info[4].value,
        email: info[5].value,
        phone: info[6].value,
        passwd: info[7].value
    }
    else if (name === 'employee') sendData = {
        surname: info[0].value,
        fname: info[1].value,
        thrname: info[2].value,
        mail: info[3].value,
        phone: info[4].value,
        activity: info[5].value,
        passwd: info[6].value,
    }
    else if (name === 'service') {sendData = {
        data: [{
            name: info[1].value,
            price: info[2].value,
            description: info[3].value,
        }],
        user: info[0].value,

    }
    query = 'client/setServices'
    }

    console.log(sendData)



    let response = (await fetch(`http://localhost:3005/${query}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(sendData)
    }));
}

async function deleteInfo(event, id, name) {
    let body = {
        id: id,
        name: name,
    }
    let response = (await fetch('http://localhost:3005/admin/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    }));
    console.log(event)
    console.log(id)
    console.log(name)
}

async function ChangeInfo (event, id, name, colums) {
    console.log(id)
    console.log(name)
    console.log(colums)
    let tablePlace = document.getElementsByClassName('tablePlace')[0]
    tablePlace.innerHTML = ``
    let elements = colums.split(',')
    elements.map((x) => {
        if (x !== 'Удалить' && x!== 'ID'){
            tablePlace.innerHTML += `<div class="inputdiv">
<p>${x}</p><input class="info">
</div>`
        }
        else if (x === 'ID') {
            tablePlace.innerHTML += `<div class="inputdiv">
<p>${x}</p><input value="${id}" class="info">
</div>`
        }
    })
    tablePlace.innerHTML += `<button onclick="sendChange( '${id}', '${name}')">Изменить</button>`
}

async function sendChange(id, name){
    let info = document.getElementsByClassName('info')
    let dataToSend = []
    Array.from(info).forEach((x)=>{
        dataToSend.push(x.value)
    })

    console.log(dataToSend)
    let response = (await fetch(`http://localhost:3005/change/${name}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(dataToSend)
    }));
}