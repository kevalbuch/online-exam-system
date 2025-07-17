const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const user = require('./routes/user')
const student = require('./routes/student')

//database connection
const connectMoongoseDb = require('./config/db');
connectMoongoseDb()
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


//routes
app.use('/user',user)
app.use('/student',student)

//listening to the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on ${process.env.BASE_URL}:${port}`);
}
);