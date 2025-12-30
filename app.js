if(process.env.NODE_ENV !="production"){
  require('dotenv').config();
}

const express=require("express");
const app =express();
const mongoose = require('mongoose');
app.use(express.urlencoded({extended:true}));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
 const ejsMate = require('ejs-mate');
 app.engine('ejs', ejsMate);
 const ExpressError=require("./utlis/ExpressError.js");
 const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
const  LocalStrategy = require("passport-local");
const User = require("./models/user.js") ;
 


 const sessionOptions={
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires: Date.now() +  7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly:true
  }
 };

 app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use (new LocalStrategy.Strategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



const listingRouter  = require("./routes/listing.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; 
  next();
});



app.use("/listings", listingRouter )
app.use("/listings/:id/reviews/",reviewRouter);
app.use("/",userRouter) ;

app.set("view engine","ejs");
const path=require("path");
const review = require("./models/review.js");
app.set("views",path.join(__dirname,"./views"));
app.use(express.static(path.join(__dirname,"/public")));

main()
.then(res=>console.log("connected to database!!"))
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlustt');
}




app.all("*",(req,res,next)=>{
 next (new ExpressError(404,"Page not found!"));
})

app.use((err,req,res,next)=>{
  let {status=500,message="something went wrong!"}=err;
   res.render("error.ejs",{message})
})


let port=8080;
app.listen(port,()=>{
    console.log("app is listening");
})