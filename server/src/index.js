const express = require('express');
const connectDB = require('../src/Config/db');
const app = express();
const routes = require('../src/Routes/index');

const PORT =  8080 || process.env.PORT;



app.use(express.urlencoded({extended:true, limit:'16kb'}));
app.use(express.json({limit:'16kb'}));

app.use('/',routes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is up and running at port ${PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !!! ", err);
})
