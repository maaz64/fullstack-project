const express = require('express');
const connectDB = require('../src/Config/db');
const app = express();
const cookieParser = require('cookie-parser');
const routes = require('../src/Routes/index');

const PORT =  8080 || process.env.PORT;



app.use(express.urlencoded({extended:true, limit:'16kb'}));
app.use(express.json({limit:'16kb'}));
app.use(cookieParser());

app.use('/api',routes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is up and running at port ${PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !!! ", err);
})
