const express = require('express');
const {connection } = require('./db');
const {userRoute} = require('./routes/user.route')
// const {auth} = require('../middlewares/auth.middleware');

const app = express();
app.use(express.json());

app.use('/users',userRoute);

app.listen(8080,async()=>{
    await connection
    console.log('server is running at port 8080');
})