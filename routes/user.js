const express=require("express");
const wrapAsync = require("../utlis/wrapAsync");
const router = express.Router({});
const passport = require("passport");
const {saveRedirectUrl} = require("../middlewares.js");
const userController = require("../controllers/users.js"); 


//renderSingnUpForm  //signUp
router.route("/signup")
     .get(( userController.renderSingnUpForm))
     .post( wrapAsync(userController.signUp));


//renderLoginForm //login
 router.route("/login")
 .get((userController.renderLoginForm))
 .post(  saveRedirectUrl,
 passport.authenticate("local", { 
   failureRedirect:"/login",
   failureFlash: true, 
}),
userController.login
);


//logout
router.get("/logout",(userController.logout));

module.exports=router;