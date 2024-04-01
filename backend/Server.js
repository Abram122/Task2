const express = require('express')
const mysql = require('mysql2')
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const session = require("express-session")
const store = new session.MemoryStore()
const cookieParser = require("cookie-parser")
const JWT = require("jsonwebtoken")
const app = express()
app.use(express.json())
app.use(cors())
app.use(session({
    secret: "some secret",
    cookie: { maxAge: 300000 },
    saveUninitialized: false,
    store
}))
app.use(cookieParser())
app.use(express.static('public'))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/'); // Specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "task2"
})


app.post('/addcompetition', (req, res) => {
    const {name,type}  = req.body
    conn.query(`INSERT INTO competitions(competitionname,competiontype) VALUES (?,?)`, [name,type], (err, data) => {
        if (err) {
            res.send("err")
        } else {
            res.send("done")
        }
    })
})

app.post('/addadmin', (req, res) => {
    const {email,password}  = req.body
    conn.query(`INSERT INTO admin(name,password) VALUES (?,?)`, [email,password], (err, data) => {
        if (err) {
            res.send("err")
        } else {
            res.send("done")
        }
    })
})


app.post('/addevent', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }
    conn.query(`INSERT INTO events(eventName, eventDescription, eventImage, eventCategory, competionName) VALUES (?,?,?,?,?)`, [req.body.name,req.body.description,req.file.filename,req.body.category,req.body.competition], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send('An error occurred while saving the file.');
        }

        return res.status(200).send('File uploaded and saved to the database!');
    });
});

app.post('/addteam', (req, res) => {
    const {name,member1,member2,member3,member4,member5,member6}  = req.body
    conn.query(`INSERT INTO teams(teamName, member1, member2, member3, member4, member5) VALUES (?,?,?,?,?,?)`, [name,member1,member2,member3,member4,member5,member6], (err, data) => {
        if (err) {
            res.send("err")
        } else {
            res.send("done")
        }
    })
})

// add a new score 
app.post('/addscore', (req, res) => {
    const {CompetionName,EventName,TeamName,score}  = req.body
    conn.query(`INSERT INTO score(competionName, eventName, teamName, totalPoints) VALUES (?,?,?,?)`, [CompetionName,EventName,TeamName,score], (err, data) => {
        if (err) {
            res.send("err")
        } else {
            res.send("done")
        }
    })
})

// register to competiton 
app.post('/register', (req, res) => {
    const {team,name}  = req.body
    const sql = `SELECT * FROM register WHERE teamName = ? AND competitionName = ?`
    conn.query(sql, [team, name], (err, data) => {
        if (err) {
            return res.send("Error from server")
        }
        if (data.length > 0) {
            res.send("This Team Already registerd in this competition")
        }else{
            conn.query(`INSERT INTO register(teamName, competitionName) VALUES (?,?)`, [team,name], (err, data) => {
                if (err) {
                    res.send("err")
                } else {
                    res.send("done")
                }
            })
        }
        })
})
// fetch all competitions name 
app.get('/getcompetion',(req,res)=>{
    const sql = `SELECT * FROM competitions`
    conn.query(sql, (err, data) => {
        if (err) {
            res.send("err")
        } else {
            res.send(data)
        }
    })
})

// fetch all events 
app.get('/getevent',(req,res)=>{
    const sql = `SELECT * FROM events`
    conn.query(sql, (err, data) => {
        if (err) {
            res.send("err")
        } else {
            res.send(data)
        }
    })
})

// fetch all teams 
app.get('/getteams',(req,res)=>{
    const sql = `SELECT * FROM teams`
    conn.query(sql, (err, data) => {
        if (err) {
            res.send("err")
        } else {
            res.send(data)
        }
    })
})

// fetch Score to rank page 
app.get('/getscore',(req,res)=>{
    const sql = `SELECT * FROM score order by totalPoints DESC`
    conn.query(sql, (err, data) => {
        if (err) {
            res.send("err")
        } else {
            res.send(data)
        }
    })
})

// fetch all users 
app.get('/getusers',(req,res)=>{
    const sql = `SELECT * FROM users`
    conn.query(sql, (err, data) => {
        if (err) {
            res.send("err")
        } else {
            res.send(data)
        }
    })
}) 


app.get('/getadmins',(req,res)=>{
    const sql = `SELECT * FROM admin`
    conn.query(sql, (err, data) => {
        if (err) {
            res.send("err")
        } else {
            res.send(data)
        }
    })
})

app.get('/getteams',(req,res)=>{
    const sql = `SELECT * FROM teams`
    conn.query(sql, (err, data) => {
        if (err) {
            res.send("err")
        } else {
            res.send(data)
        }
    })
})


app.post('/adduser', (req, res) => {
    const { name, email, password ,status } = req.body
    const sql = `SELECT * FROM users WHERE userEmail = ?`
    conn.query(sql, [email], (err, data) => {
        if (err) {
            res, send(err)
        } if (data.length > 0) {
            res.send("you already have an account please signin")
        } else {
            conn.query(`INSERT INTO users(userName, userEmail, userPassword ,status) VALUES (?,?,?,?)`, [name, email, password,status], (err, data) => {
                if (err) {
                    res.send("err")
                } else {
                    res.send("done")
                }
            })
        }
    })

})


app.post("/login", (req, res) => {
    const { email, password } = req.body
    const sql = `SELECT * FROM users WHERE userEmail = ? AND userPassword = ?`
    conn.query(sql, [email, password], (err, data) => {
        if (err) {
            return res.send("Error from server")
        }
        if (data.length > 0) {
            if (req.session.authenticated) {

            } else {
                const name = data[0].userName
                const email = data[0].userEmail
                req.session.authenticated = true
                req.session.user = {
                    name, email
                }
                res.send(req.session)
            }
        }
        else {
            return res.send("No email exits or password is wrong")
        }
    })
})


app.post('/deleteadmin',(req,res)=>{
    const { id } = req.body
    console.log(id)
    const sql = `DELETE FROM admin WHERE id = (?)`
    conn.query(sql, [id],(err, data) => {
        if (err) {
            res.send("err")
        } else {
            res.send("done")
        }
    })
})


app.post('/admin',(req,res)=>{
    const { name, password } = req.body
    const sql = `SELECT * FROM admin WHERE name = ? AND password = ?`
    conn.query(sql, [name, password], (err, data) => {
        if (err) {
            return res.send("Error from server")
        }
        if (data.length > 0) {
            if (data.length > 0) {
                if (req.session.authenticated) {
    
                } else {
                    const name = data[0].name
                    const password = data[0].password
                    req.session.authenticated = true
                    req.session.user = {
                        name, password
                    }
                    res.send(req.session)
                }
            }
            else {
                return res.send("Please Check name and password")
            }
}
})
})















app.get('/fetch',(req,res)=>{
    const sql = `SELECT * FROM products`
    conn.query(sql, (err, data) => {
        if (err) {
            res.send("err")
        } else {
            res.send(data)
        }
    })
})






app.get('/catogries',(req,res)=>{
    conn.query("SELECT * FROM `catogeries`",(err,data)=>{
        if(err){
            res.send("error")
        }else{
            res.send(data)
        }
    })
})


app.post('/addcategory',(req,res)=>{
    const { category} = req.body
    const sql = `INSERT INTO catogeries(catogeries) VALUES (?)`
    conn.query(sql, category, (err, data) => {
        if (err) {
            return res.send("Error from server")
        }else{
            res.send("added")
        }
})
})

app.post('/order',(req,res)=>{
    const {first_name,last_name,company_name,addrees,state,zip,phone,email,products,total} = req.body
    const sql = `INSERT INTO orders(first_name, last_name, company_name, address, state, zip, phone, email, products, total) VALUES (?,?,?,?,?,?,?,?,?,?)`
    conn.query(sql, [first_name,last_name,company_name,addrees,state,zip,phone,email,products,total], (err, data) => {
        if (err) {
            return res.send("Error from server")
        }else{
            res.send("added")
        }
    })
})

app.get("/getorders",(req,res)=>{
    const sql = `SELECT * FROM orders`
    conn.query(sql,(err,data)=>{
        if(err){
            res.send("error")
        }else{
            res.send(data)
        }
    })
})

app.listen(5000, () => {
    console.log("server is runnig")
})
