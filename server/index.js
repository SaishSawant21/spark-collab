import express from 'express';
import app from './app.js';
import db from './config/db.js';
const port = 3000;

async function checkConnection(){
    try {
        await db.connect();
        console.log('Success');        
    } catch (error) {
        console.log('error', error);
    }
}

checkConnection();
app.listen(port,()=>{
    console.log('...Running');
})