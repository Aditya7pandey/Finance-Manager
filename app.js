const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const userModel = require('./models/user');
const expenceModel = require('./models/expence');
const expence = require('./models/expence');
app.set('view engine', 'ejs');
// app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', function (req, res) {
    res.render('signup');
})

app.get('/login', function (req, res) {
    res.render('login');
})

app.get('/dashboard',isLoggedIn,async function (req, res) {
    let user = await userModel.findOne({email:req.user.email}).populate('expence'); 
    // console.log(user);
    res.render('dashboard',{user});
})

app.get('/reports', function (req, res) {
    res.render('reports');
})

function isLoggedIn(req,res,next){
    if(req.cookies.token == ""){
        res.send("You must logged in");
    }
    else{
        let data = jwt.verify(req.cookies.token,"secret");
        req.user = data;
    }
    next();
}

app.post('/signup', async function (req,res) {
    let { name, userName, email, password } = req.body;
    // console.log(req.body);
    let user = await userModel.findOne({email});
    if(user){
        return res.send("user already exist");
    }
    
    bcrypt.genSalt(10, function (err,salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            let user = await userModel.create({
                name,
                userName,
                email,
                password: hash
            })
            let token = jwt.sign({ email }, "secret");
            res.cookie("token", token);
            res.redirect('/dashboard');
        })
    })
})


app.post('/login',async function(req,res){
    let user = await userModel.findOne({email:req.body.email});
    if(!user) return res.send("Something went wrong");

    bcrypt.compare(req.body.password,user.password,function(err,result){
        if(result){
            let token = jwt.sign({email:user.email},"secret");
            res.cookie("token",token);
            res.redirect('/dashboard');
        }
        else{
            res.send("Something went wrong");
        }
    })
})

app.post('/logout',function(req,res){
    res.cookie("token","");
    res.render('login');
})

app.get('/expence',function(req,res){
    res.render('expence');
})

app.post('/expence',function(req,res){
    res.render('expence');
})

app.post('/addExpence',isLoggedIn,async function(req,res){
    let {description,amount,category} = req.body;
    let user = await userModel.findOne({email:req.user.email});
    // console.log(user);

    let expence = await expenceModel.create({
        user:user._id,
        description,
        amount,
        category
    })

    user.expence.push(expence._id);
    await user.save();
    res.redirect('/dashboard');
})

app.post('/deleteExpence',isLoggedIn,async function(req,res){
    let expence = await expenceModel.findOneAndDelete({_id:req.body.expenceId});
    res.redirect('/dashboard');
})

app.get('/edit/:expenceId',isLoggedIn,async function(req,res){
    let expenceId = req.params.expenceId;
    let expence = await expenceModel.findOne({_id:expenceId});

    res.render('edit',{expence});
})

app.post('/editExpence/:expenceId',async function(req,res){
    let expenceId = req.params.expenceId;
    let {date,description,category,amount} = req.body;
    let update = await expenceModel.findOneAndUpdate({_id:expenceId},{
        date,description,amount,category
    },{new:true});
    res.redirect('/dashboard');
})

app.listen(3000);