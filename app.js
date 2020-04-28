const express =require('express');
const mysql= require('mysql');

const db =mysql.createConnection({
    host    :  'localhost',
    user    :   'root',
    password : 'expecto10',
    database : 'nodemysql'
});

db.connect((err) =>{
    if(err){
        //throw err;
    }
    console.log('MySql Connected');
});



const app=express();

app.get('/createdb',(req,res) =>{
    let sql ='CREATE DATABASE nodemysql';
    db.query(sql,(err,result)=>{
        // if(err) throw err;
        console.log(result);
        res.send('database created..');
    });
});

//create
app.get('/createpoststable',(req,res) =>{
    let sql ='CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql,(err,result)=>{
        // if(err) throw err;
        console.log(result);
        res.send('Posts tablecreated..');
    });
});

app.get('/addpost2',(req,res) =>{
    let post ={title:'Post one ',body:'This is post two'};
    let sql='INSERT INTO posts SET ?';
    let query=db.query(sql,(err,result)=>{
        // if(err) throw err;
        console.log(result);
        res.send('Post 2added..');
    });
});

//read
app.get('/getpost/:id',(req,res) =>{
    let sql='SELECT * FROM posts WHERE id=${req.params.id}';
    let query=db.query(sql,(err,result)=>{
        // if(err) throw err;
        console.log(result);
        res.send('Post read..');
    });
});

//update
app.get('/updatepost/:id',(req,res) =>{
    let newTitle="Upadated Title";
    let sql='UPDATE posts SET title = ${newTitle}  WHERE id=${req.params.id}';
    let query=db.query(sql,(err,result)=>{
        // if(err) throw err;
        console.log(result);
        res.send('Post updated..');
    });
});

//delete
app.get('/deletepost/:id',(req,res) =>{
    let sql='DELETE FROM posts WHERE id=${req.params.id}';
    let query=db.query(sql,(err,result)=>{
        // if(err) throw err;
        console.log(result);
        res.send('Post deleted..');
    });
});


app.listen('3000',() => {
    console.log('Server started on port 3000');
});
