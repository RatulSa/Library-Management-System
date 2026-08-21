const express = require("express");
require('dotenv').config();
const logger = require('./utils/logger');
const sequelize = require('./config/db');
const UserProfile = require('./models/userProfile');

//routes import
const booksRoutes = require('./routers/booksRoute');
const userRoutes = require('./routers/userRoute');
const recordsRoute = require('./routers/recordsRoute');
const paymentsRoute = require('./routers/paymentRoute');
const statisticsRoute = require('./routers/statisticsRoute');


const app = express();
const PORT = 3000;
const pool = require('./config/db');
const erroHandler = require("./middleware/errorHandler");
app.use(express.json());
app.use(logger);


app.use('/books',booksRoute);
app.use('/users',usersRoute);
app.use('/records',recordsRoute);
app.use('/payments',paymentsRoute);
app.use('/statistics', statisticsRoute);


app.use(erroHandler);

// app.get('/',(req,res)=>{
//     res.end("hello");
// })

    
 const connection = async ()=>{

    try {
        await sequelize.authenticate();
        console.log("DB is connected");
        
        await sequelize.sync({ alter: true});
        app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)});
        
    } catch (error) {
        console.log(error);
    }
}

connection();
