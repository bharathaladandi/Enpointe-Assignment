const express = require('express');

const cors = require('cors');

const connect = require('./Config/db');
const { UserRouter } = require('./Routes/user.routes');


const app = express();
app.use(express.json());
app.use(cors());


const PORT = 8080;

app.use("/users", UserRouter)



app.listen(PORT, async () => {
    try {
        await connect
        console.log("Connected to DB Successfully")

    } catch (err) {
        console.log("error while connecting to db", err);
    }


    console.log(`Listen on port ${PORT}`);
})