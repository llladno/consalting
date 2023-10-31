const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2')
const {request} = require("express");
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
    console.log(req.body)
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
            resp.length === 0 ? res.sendStatus(400)
                : res.send(200)
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
    app.post('/client/getServices',(req,res)=>{
        console.log(req.body)
        res.send({data: 'data'})
        // res.status(200).send({message: "Hello!"});
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


    app.post('/admin/delete',(req,res)=>{
        console.log(req.body)
        let whereis
        if(req.body.table === 'client') whereis = 'idclient'
        else if(req.body.table === 'employee') whereis = 'idemployee'
        else if(req.body.table === 'ticket') whereis = 'idticket'
        else if(req.body.table === 'cheque') whereis = 'idcheque'

        connection.query(`delete from ${req.body.table} where ${whereis} = ${req.body.id}`)
    })



    app.post('/admin/change/client',(req,res)=>{
        console.log(req.body)
        console.log(req.body[0])
        console.log(req.body)
        connection.query(`UPDATE client SET name = '${req.body[1]}', pol = '${req.body[2]}', datebirthday='${req.body[3]}',
email = '${req.body[4]}',phone = '${req.body[5]}', passwd = '${req.body[6]}' WHERE idclient = ${+req.body[0]}`,
            (err, res) => {
            });
    })

    app.post('/admin/change/employ',(req,res)=>{
        console.log(req.body)
        console.log(req.body[0])
        connection.query(`UPDATE employee SET name = '${req.body[1]}', phone = '${req.body[2]}', datebirthday = '${req.body[3]}' WHERE idemployee = ${+req.body[0]}`,
            (err, res) => {
            });
    })



    app.post('/admin/change/ticket',(req,res)=>{
        console.log(req.body)
        console.log(req.body[0])
        console.log(req.body)
        connection.query(`UPDATE ticket SET category = '${req.body[1]}', cost = ${+req.body[2]}, time = '${req.body[3]}', person = ${+req.body[4]}, dateticket = '${req.body[5]}'  WHERE idticket = ${+req.body[0]}`,
            (err, res) => {
            });
    })
    app.post('/admin/change/cheque',(req,res)=>{
        console.log(req.body)
        console.log(req.body[0])
        console.log(req.body)
        connection.query(`UPDATE cheque SET idemployee = ${+req.body[1]}, idclient = ${+req.body[2]}, idticket = ${+req.body[3]}, dateandtime = '${req.body[4]}'  WHERE idcheque = ${+req.body[0]}`,
            (err, res) => {
            });
    })

    app.post('/user/home',(req,res)=>{
        console.log(req.body)
        let id
        connection.query(`select * from client where email = ${req.body.mail}`, (err, resu) => {
            console.log(resu)
            res.send({resu})
        })
    })

    app.post('/user/home/cheque',(req,res)=>{
        console.log(req.body)
        let id
        connection.query(`select * from client where email = ${req.body.mail}`, (err, resu) => {
            console.log(resu)
            if(resu[0].idclient != undefined){
                id = resu[0].idclient
                console.log(id)
                console.log('tit')
                connection.query(`SELECT *
FROM cheque
inner JOIN ticket
ON cheque.idticket = ticket.idticket where idclient = '${id}'`, (err, result) => {
                    console.log(result)
                    res.send({result})
                })
            }
        })

    })

    app.post('/user/buyticket',(req, res)=>{
        console.log(req.body)
        let dateBuy = new Date()
        connection.query(`SELECT *
FROM ticket
ORDER BY idticket DESC
LIMIT 1`, (error,resul)=>{
            console.log(error)
            let freeID = resul[0].idticket
            connection.query(`insert into cheque(idemployee, idclient, idticket,dateandtime)
    values(2,${+req.body.idclient},
    ${+freeID},'${dateBuy.toLocaleString()}')`)
        })
        connection.query(`insert into ticket(category, cost, time, person,dateticket)
    values('${req.body.category}',${+req.body.cost},
    '${req.body.timee}',
    ${+req.body.person},'${req.body.dateticket}')`)

//     connection.query(`insert into ticket(category, cost, time, person,dateticket)
//     values('${req.body.category}',${+req.body.cost},
//     '${req.body.time}',
//     ${+req.body.person},'${req.body.dateticket}')`, (err, result)=>{
//         console.log(err)
//             connection.query(`SELECT *
// FROM ticket
// ORDER BY idticket DESC
// LIMIT 1`, (error,resul)=>{
//             console.log(err)
//             console.log(resul[0].idticket)
//                 connection.query(`insert into cheque(idemployee, idclient, time, idticket,dateandtime)
//     values(1,${+req.body.cost},
//     '${req.body.time}',
//     ${+req.body.person},'${req.body.dateticket}')`)
//         })
//     })

    })
    app.post('/getstat',(req,res)=>{
        connection.query(`select * from ticket`, (err, resu) => {
            console.log(resu)
            res.send({resu})
        })
    })





},1000)



