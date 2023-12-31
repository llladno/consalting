const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2')
const {request, response} = require("express");
const {set} = require("express/lib/application");
const {resetWatchers} = require("nodemon/lib/monitor/watch");
//
// const connection = mysql2.createConnection({
//     host: 'localhost',
//     user: 'a4',
//     port:3000,
//     database: 'delf',
//     password: 'Qwerty123!'
// })

app.use(cors())
app.use(bodyParser.json())

var db_config = {
    host: 'localhost',
    user: 'root',
    // port:3000,
    database: 'company',
    password: 'qwerty'
};



setTimeout(()=>{
    let stat = 'noerror'
    var connection;
    function handleDisconnect() {
        connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                        // the old one cannot be reused.
        console.log('err')
        setTimeout(()=>{

        }, 100)



        connection.connect(function(err) {              // The server is either down
            if(err) {                                     // or restarting (takes a while sometimes).
                console.log('error when connecting to db:');
                setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
            }                                     // to avoid a hot loop, and to allow our node script to
            else {
                console.log('Connection: OK!')
                app.get('/noerror', (req,res)=>{
                    console.log('su1')
                    res.send(['OK!'])
                })
            }
        });                                     // process asynchronous requests in the meantime.
                                                // If you're also serving http, display a 503 error.
        connection.on('error', function(err) {
            console.log('db error');
            if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
                handleDisconnect();                         // lost due to either server restart, or a
            } else {
                console.log('not ok')// connnection idle timeout (the wait_timeout
                app.get('/con/error', (req,res)=>{
                    console.log('su1')
                    res.send(['notok'])
                })


                // throw err;                                  // server variable configures this)
            }
        });
    }

    handleDisconnect();
    
    app.listen(3005, () => {
        console.log('server started')
    })
    setTimeout(()=>{
        connection.connect(err => {
            if (err) console.log(err)
            else {
                console.log("OK!")
            }
        })

    },500)



// connection.query(`SELECT * FROM client`, (err, res) => {
//     console.log(res)
//     console.log(err)
// })

    app.post('/user/registration', (req, res) => {
        console.log(req.body)
        connection.query(`insert into client(surname, clientname, parent, companyname,
        addresscompany, email, phone, passwd) 
    values('${req.body.surname}',
        '${req.body.name}',
        '${req.body.parent}',
        '${req.body.email}',
        '${req.body.phone}',
        '${req.body.nameCompany}',
        '${req.body.addressCompany}',
        '${req.body.passwd}')`,
            (err, resp) => {
                console.log(resp)
                console.log(err)
                if (err) {
                    res.send('error')
                }
                else {
                    res.send('ok')
                }
            });

    })

app.post('/add/service', async (req, res)=>{
    let getid
    connection.query(`SELECT * FROM employee`,(err, request)=>{
        getid = request.filter((x)=> x.activity === req.body.servicename)
        console.log(getid)
            connection.query(`insert into service(idemployee, nameservice, costservice, descriptionservice)
    values(${getid[0].idemployee},'${req.body.servicename}',${req.body.price},'${req.body.description}')`,
                (err, resp) => {
                });
        })
    })


    app.post('/user/login',(req,res)=>{
        let allUsers
        let status
        console.log(req.body)

        connection.query(`SELECT * FROM company.client where email = '${req.body.login}' AND passwd = '${req.body.passwd}'`,
            (err,resp)=>{
                console.log(err)
                console.log(resp)
                if (err) {
                    console.log('ERROR')
                }
            resp.length === 0 ? res.send({message: 'error'})
                : res.send({message: resp[0].idclient})
            })

        console.log('ok')
        // connection.query(`SELECT * FROM client`,(err,request)=>{
        //     allUsers = request
        //     console.log(req.body.mail)
        //     for (let b = 0; b < allUsers.length; b++){
        //         if((allUsers[b].email === req.body.mail) && (allUsers[b].passwd === req.body.pass)){
        //             console.log('Это он!',allUsers[b])
        //             status = 'ok'
        //             res.send({stat:status, id:allUsers[b].idclient})
        //             break
        //         }
        //         if(b+1 == allUsers.length){
        //             res.send({stat:'notok'})
        //         }
        //     }
        // })
    })


    app.post('/client/getOrdersCheck',(req,res)=>{
        console.log(req.body.id)
        connection.query(`SELECT * FROM company.ordercheck WHERE idclient = ${+req.body.id}`,(err, request)=>{
            console.log(request)
            res.send({data: request})
        })
    })

    app.post('/client/payOrdersCheck',(req,res)=>{
        connection.query(`DELETE FROM company.mainorder WHERE orderwrite='${req.body.orderwrite} AND idclient = ${req.body.user}`)
        console.log(req.body.id)
    })


    app.post('/client/getServices',(req,res)=>{
        console.log(req.body.id)
        // connection.query(``)
        // SELECT * FROM mainorder where idclient = ${req.body.id}`,(err, request)=>{
            connection.query(`SELECT 
        MAX(idorder) AS idorder,
        MAX(idclient) AS idclient,
    GROUP_CONCAT(idservice SEPARATOR ',') AS idservice,
        MAX(descriptionorder) AS descriptionorder,
        SUM(costorder) AS costorder,
        MAX(dateorder) AS dateorder,
        orderwrite
    FROM mainorder where idclient = ${req.body.id}
    GROUP BY orderwrite
    ORDER BY idorder;`,(err, request)=>{
                console.log(request)
                res.send({data: request})
            })
        // res.status(200).send({message: "Hello!"});
    })

    app.post('/client/setServices', async (req,res)=>{
        console.log(req.body)
        Array.from(req.body.data).forEach((y)=>{
            let getid
            console.log(y)
            connection.query(`SELECT * FROM employee`,(err, request)=>{
                getid = request.filter((x)=> x.activity === y.name)
                console.log(getid)
                connection.query(`insert into service(idemployee, nameservice, costservice, descriptionservice)
    values(${getid[0].idemployee},'${y.name}',${y.price},'${y.description}')`,
                    (err, resp) => {
                    });
            })
        })
        let date = new Date()
        setTimeout( ()=>{
            let autoinc
            connection.query('select orderwrite from mainorder',(err, resp)=>{
                autoinc = resp[resp.length-1].orderwrite
            })
            console.log(autoinc)
            let id = []
            setTimeout(()=>{
                connection.query(`select * from service`,(err, resp)=>{
                    console.log(err)
                    console.log(resp.length)
                    for (let c = 0; c < req.body.data.length; c++){
                        id.push(resp[resp.length - c-1])
                    }
                })
            },100)
            setTimeout(()=>{
                autoinc = autoinc+1

                let cost = 0
                Array.from(id).forEach((x)=>{
                    cost = cost + x.costservice
                })
                id.forEach((x)=>{
                    connection.query(`INSERT INTO company.mainorder (idclient,idservice, descriptionorder, costorder, dateorder, orderwrite)
VALUES ( ${req.body.user}, '${x.idserice}',
'ivanov_ii@example.com',
${x.costservice},
"${date.toLocaleDateString()}",'${autoinc}')`,(err, resp)=>{
                        console.log(err)
                        console.log(resp)
                    })
                    connection.query(`INSERT INTO company.report (idservice,datereport,readyreport,readyservice,filepath) VALUES (${x.idserice},'${date.toLocaleDateString()}', 0, 0, '')`, (err,respon)=>{
                        console.log(err)
                        console.log(respon)
                    })
                })
                setTimeout(()=>{
                    connection.query(`SELECT
        MAX(idorder) AS idorder,
        MAX(idclient) AS idclient,
    GROUP_CONCAT(idservice SEPARATOR ',') AS idservice,
        MAX(descriptionorder) AS descriptionorder,
        SUM(costorder) AS costorder,
        MAX(dateorder) AS dateorder,
        orderwrite
    FROM mainorder where idclient = ${req.body.user}
    GROUP BY orderwrite
    ORDER BY idorder;`,(err, request)=>{
                        console.log(err)
                        console.log("REQUREST")
                        autoinc -= 1
                        console.log(request[autoinc])
                        let data = request[autoinc]
                        console.log(data)
                        console.log(autoinc)
                connection.query(`INSERT INTO company.ordercheck (idclient,idorder,dateordercheck,dateorderpay,sumordercost,
statusordercheck, orderwrite) VALUES (${req.body.user}, '${data.idservice}', '${date.toLocaleDateString()}', 'Не оплачено', ${+data.costorder}, 'Не готов', '${data.orderwrite}')`, (err, respo) =>{
                    console.log(err)
                })
                    })
                },400)
            },200)
        },200)
    })



    app.post('/client/getReport', (req,res)=>{
        connection.query(`SELECT * FROM report where `)
    })



    app.post('/admin/getTable', async (req,res)=>{
        if (req.body.table === 'mainorder') {
            connection.query(`SELECT
        MAX(idorder) AS idorder,
        MAX(idclient) AS idclient,
    GROUP_CONCAT(idservice SEPARATOR ',') AS idservice,
        MAX(descriptionorder) AS descriptionorder,
        SUM(costorder) AS costorder,
        MAX(dateorder) AS dateorder,
        orderwrite
    FROM mainorder 
    GROUP BY orderwrite
    ORDER BY idorder;`, (err, response)=>{
                res.send({data: response})
            })
        } else {
            connection.query(`SELECT * FROM ${req.body.table}`, (err, response)=>{
                res.send({data: response})
            })
        }
        console.log(req.body.table)

    })




    app.post('/admin/delete',(req,res)=>{
        console.log(req.body)
        let whereis
        if(req.body.name === 'mainorder') whereis = 'orderwrite'
        else if(req.body.name === 'client') whereis = 'idclient'
        else if(req.body.name === 'employee') whereis = 'idemployee'
        else if(req.body.name === 'service') whereis = 'idserice'
        else if(req.body.name === 'report') whereis = 'idreport'
        else if(req.body.name === 'ordercheck') whereis = 'orderwrite'

        connection.query(`delete from ${req.body.name} where ${whereis} = ${req.body.id}`)
    })

    app.post('/change/employee', (req,res)=>{
        connection.query(`UPDATE employee SET surname = '${req.body[1]}', fname = '${req.body[2]}', 
thrname = '${req.body[3]}', mail = '${req.body[4]}', phone = '${req.body[5]}', activity = '${req.body[6]}', 
passwd = '${req.body[7]}', WHERE idemployee = ${+req.body[0]}`,
            (err, res) => {
            });
    })

    app.post('/change/client', (req,res)=>{
        connection.query(`UPDATE client SET surname = '${req.body[1]}', clientname = '${req.body[2]}', 
companyname = '${req.body[4]}', addresscompany = '${req.body[5]}', email = '${req.body[6]}', phone = '${req.body[7]}', 
passwd = '${req.body[8]}', parent = '${req.body[3]}' WHERE idclient = ${+req.body[0]}`,
            (err, res) => {
                console.log(err)
            });
    })

    app.post('/change/mainorder', (req,res)=>{
        connection.query(`UPDATE mainorder SET idclient = '${req.body[1]}', idservice = '${req.body[2]}', 
descriptionorder = '${req.body[3]}', costorder = '${req.body[4]}', dateorder = '${req.body[5]}' WHERE orderwrite = ${+req.body[0]}`,
            (err, res) => {
                console.log(err)
            });
    })

    app.post('/change/service', (req,res)=>{
        connection.query(`UPDATE service SET idemployee = '${req.body[1]}', nameservice = '${req.body[2]}', 
costservice = '${req.body[3]}', 
descriptionservice = '${req.body[4]}'
WHERE idserice = '${+req.body[0]}'`,
            (err, res) => {
                console.log(err)
            });
    })

    app.post('/change/ordercheck', (req,res)=>{
        console.log(req.body)
        connection.query(`UPDATE ordercheck SET idclient = '${req.body[1]}', idorder = '${req.body[2]}', 
dateordercheck = '${req.body[3]}', 
dateorderpay = '${req.body[4]}',
sumordercost = '${req.body[5]}',
statusordercheck = '${req.body[6]}'
WHERE orderwrite = '${+req.body[0]}'`,
            (err, res) => {
                console.log(err)
            });
    })

    app.post('/change/report', (req,res)=>{
        console.log(req.body)
        connection.query(`UPDATE report SET idservice = '${req.body[1]}', datereport = '${req.body[2]}', 
readyreport = '${req.body[3]}', 
readyservice = '${req.body[4]}',
filepath = '${req.body[5]}'
WHERE idreport = '${+req.body[0]}'`,
            (err, res) => {
                console.log(err)
            });
    })

    app.get('/admin/client',(req,res)=>{
        connection.query(`SELECT * FROM client`,(err, request)=>{
            res.send(request)
        })
    })

    app.get('/admin/employee',(req,res)=>{
        connection.query(`SELECT * FROM employee`,(err, request)=>{
            res.send(request)
        })
    })

    app.get('/admin/ticket',(req,res)=>{
        connection.query(`SELECT * FROM ticket`,(err, request)=>{
            res.send(request)
        })
    })

    app.get('/admin/cheque',(req,res)=>{
        connection.query(`SELECT * FROM cheque`,(err, request)=>{
            res.send(request)
        })
    })

    app.post('/admin/add/employ',(req,res)=>{
        console.log(req.body)
        console.log(req.body[0])
        connection.query(`insert into employee(name, phone, datebirthday) 
    values('${req.body[0]}','${req.body[1]}',
    '${req.body[2]}')`,
            (err, resp) => {
            });
    })

    app.post('/admin/add/client',(req,res)=>{
        console.log(req.body)
        console.log(req.body[0])
        console.log(req.body)
        connection.query(`insert into client(name, pol, datebirthday, email,phone,passwd)
    values('${req.body[0]}','${req.body[1]}',
    '${req.body[2]}','${req.body[3]}','${req.body[4]}','${req.body[5]}')`,
            (err, res) => {
            });
    })

    app.post('/admin/add/ticket',(req,res)=>{
        console.log(req.body)
        console.log(req.body[0])
        console.log(req.body)
        connection.query(`insert into ticket(category, cost, time, person,dateticket)
    values('${req.body[0]}',${+req.body[1]},
    '${req.body[2]}',${+req.body[3]},'${req.body[4]}')`,
            (err, res) => {
            });
    })
    app.post('/admin/add/cheque',(req,res)=>{
        console.log(req.body)
        console.log(req.body[0])
        console.log(req.body)
        connection.query(`insert into cheque(idemployee, idclient, idticket, dateandtime)
    values(${+req.body[0]},${+req.body[1]},
    ${+req.body[2]},'${req.body[3]}')`,
            (err, res) => {
                console.log(err)
            });
    })







    app.post('/admin/change/employ',(req,res)=>{
        console.log(req.body)
        console.log(req.body[0])
        connection.query(`UPDATE employee SET name = '${req.body[1]}', phone = '${req.body[2]}', datebirthday = '${req.body[3]}' WHERE idemployee = ${+req.body[0]}`,
            (err, res) => {
            });
    })













},1000)



