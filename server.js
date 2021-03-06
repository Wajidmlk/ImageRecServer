const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profileId = require('./controllers/profile');
const image = require('./controllers/image');
const db= knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
  }
});

db.select('*').from('users')
.then(data=>{
	console.log(data);
});


const app = express();
app.use(bodyParser.json());
app.use(cors());






app.get('/',(req,res)=>{res.json(":D")})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
		
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profileId.handleProfileGet(req,res, db)})

app.put('/image',(req,res)=>{image.handleImage(req,res, db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})




app.listen(process.env.PORT || 3000,()=>{
	console.log(`running on port: ${process.env.PORT}`)
})
