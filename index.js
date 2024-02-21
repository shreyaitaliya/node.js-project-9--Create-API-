const express = require('express');

const app = express();

const port = 9000;

const db = require('./config/db');

app.use(express.urlencoded());

app.use('/', require('./routes/indexroutes'));

app.listen(port, (error) => {
    if (error) {
        console.log(error);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
})