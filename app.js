const express =require('express');
const mysql= require('mysql');
const bodyparser=require('body-parser');


const db =mysql.createConnection({
    host    :  'localhost',
    user    :   'root',
    password : 'Purvi@10',
    database : 'employee'
});

db.connect((err) =>{
    if(err){
        console.log(err);
    }
    else
    console.log('MySql Connected');
});

const app=express();

app.use(bodyparser.json());

app.get('/createdb',(req,res) =>{
    let sql ='CREATE DATABASE employee';
    db.query(sql,(err,result)=>{
        // if(err) throw err;
        console.log(result);
        res.send('database created..');
    });
});

app.get('/createpoststable',(req,res) =>{
    let sql ='CREATE TABLE employee(EmpId int AUTO_INCREMENT,EmpName VARCHAR(45),EmpCode VARCHAR(20),PRIMARY KEY(EmpId))';
    db.query(sql,(err,result)=>{
        if(err) console.log('Table creation failed\nError : '+ JSON.stringify(err));
        else{
        console.log(result);
        res.send('table created..');
        }
    });
});

//get all employees
app.get('/employees',(req,res) =>{
    let sql='SELECT * FROM employee';
    let query=db.query(sql,(err,rows,fields)=>{
        // if(err) throw err;
        console.log(rows[0].EmpId);
        res.send(rows);
    });
});

//select single post
app.get('/employees/:id',(req,res) =>{
    let sql='SELECT * FROM employee WHERE EmpId=?';
    let query=db.query(sql,[req.params.id],(err,rows,fields)=>{
        // if(err) throw err;
        console.log(rows[0].EmpId);
        res.send(rows);
    });
});

//delete
app.delete('/employees/:id',(req,res) =>{
    let sql='DELETE FROM employee WHERE EmpId=?';
    let query=db.query(sql,[req.params.id],(err,rows,fields)=>{
        if(!err) 
            res.send("Deleted Successfully");
        else
            console.log(err);
    });
});


//insert
app.post('/employees',(req,res) =>{
    let emp=req.body;
    let value=[emp.id,emp.name,emp.code]
    let sql='INSERT INTO employee(EmpId,EmpName,EmpCode)VALUES(?)';
    let query=db.query(sql,[value],(err,result)=>{
        if(!err){ 
            res.send('Added successfully');
            console.log(result);
        }
        else
            console.log(err);
    });
});

//update
app.put('/employees',(req,res) =>{
    let emp=req.body;
    let value=[emp.id,emp.name,emp.code]
    let sql='UPDATE employee SET EmpName =? WHERE EmpID=?';
    let query=db.query(sql,[emp.name,emp.id],(err,result)=>{
        if(!err){ 
            console.log(result);
            res.send('Updated successfully');
        }
        else
            console.log(err);
    });
});

app.listen('3000',() => {
    console.log('Server started on port 3000');
});
