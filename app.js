const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});

db.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('mysql connected...');
    }
});


const app = express();

// create the database

app.get('/createdb', (req, res) => {
    let sql = "CREATE DATABASE nodemysql";
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send('Database created...');
            console.log(result);
        }
    });
});

// create table in the database

app.get('/createpost', (req, res) => {
    let sql = `CREATE TABLE post(
        id INT AUTO_INCREMENT,
        title VARCHAR(255),
        post VARCHAR(255),
        post_date DATETIME,
        PRIMARY KEY(id)
        )`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send('Table created...');
            console.log(result);
        }
    });
});

// insert post 1

app.get('/addpost', (req, res) => {
    let sql = `INSERT INTO post (title, post, post_date) values ('Why Fred ate beans', 'This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). ', now())`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send('post created...');
            console.log(result);
        }
    });
});

app.listen('3000', () => {
    console.log('server started on port 3000');
});