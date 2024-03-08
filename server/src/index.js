const express = require('express');
const connectDB = require('../src/Config/db');
const passport =require('passport');
const passportJWT  = require('./Config/passport-jwt');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const routes = require('../src/Routes/index');
const errorMiddleware = require('./Middleware/errorMiddleware');

const PORT =  8080 || process.env.PORT;

const corsOption = {
    origin: ['http://localhost:3000','https://localhost:3000',],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption));

app.use(express.urlencoded({extended:true, limit:'16kb'}));
app.use(express.json({limit:'16kb'}));
app.use(cookieParser());

app.use('/api',routes);
app.use(errorMiddleware);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is up and running at port ${PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !!! ", err);
})
