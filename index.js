const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config()
//Middlewares
app.use(express.json())
//connect to DB
mongoose.connect(process.env.DATABASE_URL,
{ useNewUrlParser: true,
  useUnifiedTopology: true,},
 ()=> {
  console.log("Connected to DB");
})
//Import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => {
  console.log("Running in PORT:3000");
})