var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectId ;
var express = require('express');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var nodemailer=require('nodemailer');
var session = require('express-session');
var path=require('path');
var ejs = require('ejs');
var port=3000;
var mongoDB="mongodb+srv://Yash:9cdvquLtjVEOGxdv@cluster0-rztnl.gcp.mongodb.net/Instantagram?retryWrites=true&w=majority";

/*mongodb+srv://Yash:9cdvquLtjVEOGxdv@cluster0-rztnl.gcp.mongodb.net/Instantagram?retryWrites=true&w=majority*/

mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology: true});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('views', path.join(__dirname,'public'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
	secret: "hardikmotalol",
	resave: true,
	saveUninitialized: true
	}));

mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology: true});

mongoose.connection.on('error',(err)=>{
	console.log("DB Connection Error");
});

var Schema = mongoose.Schema;

 var userSchema = Schema({
	name: String,
	username : String,
	email : String,
	password : String,
	salt : String,
	VerifiedOTP : String
});

var otpSchema = Schema({
	email : String,
	otp : String,
	salt : String
});

var userdetails = mongoose.model('userDetails',userSchema,'userdetails');
var otpdetails = mongoose.model('otpDetails',otpSchema,'otpdetails');

//-------------------Functions--------------------------//

var getRandomString = function(length){
	return crypto.randomBytes(Math.ceil(length/2))
	.toString('hex')
	.slice(0,length);
}

var sha512 = function(password,salt){
	var hash = crypto.createHmac('sha512',salt);
	hash.update(password);
	var value = hash.digest('hex');
	return{
		salt:salt,
		passwordHash:value
	};
};

function saltHashPassword(userPassword){
	var salt = getRandomString(16);
	var passwordData = sha512(userPassword,salt);
	return passwordData;
	
}

function checkHashPassword(userPassword,salt){
	var passwordData = sha512(userPassword,salt);
	return passwordData;
}

function getSecuredPassword(plain_password)
{
		var hash_data = saltHashPassword(plain_password);
		var password=hash_data.passwordHash;
		var salt=hash_data.salt;
		return{
			salt:salt,
			password:password
		};
};

//--------------------------------------------------------------------//

app.get('/',function(req,res){
	
	res.sendFile('/index.html')
	
});

app.post('/login',function(req,res){
	
	var body=req.body;
	console.log(body);
	res.send('abc');
	
});

app.get('/register',function(req,res){
	
	res.sendFile('./register.html');
	
})




app.listen(process.env.PORT || port,()=>{console.log("Listening on port "+port);});
