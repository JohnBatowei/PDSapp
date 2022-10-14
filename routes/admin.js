let express = require('express')
let router = express.Router() 
// const mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let adminModel = require("../models/admin");
let regModel = require('../models/reg')
let studentReceipt = require('../models/receipt')

const isAuth = require('../authentication/adminAuth')
// const isAuth = (req,res,next)=>{
//       if(req.session.isAuth){
//         next()
//       }
//       else{
//         res.redirect('/')
//       }
// }
router.post('/', async(req,res)=>{

     try {
    //the adminfi
    const adminfind = await adminModel.findOne({ email: req.body.email });
    console.log(adminfind);
    if (adminfind) {
       var passwordMatch = await bcrypt.compare(req.body.password, adminfind.password)
      if (passwordMatch) {
          // ..... further code to maintain authentication like jwt or sessions
          req.session.isAuth = true;
           res.redirect("/admin/dashboard");
          // regModel.find().sort({ createdAt: -1})
          // .then((datas)=>{
          //   //  res.render("admin",{title:'AdminPanel', message: 'Admin', result: datas});
           
          //    console.log(passwordMatch)
          //   //responding to the browser
          //   // res.json({})
          // }).catch((err)=>{
          //   console.log(err);
          // })
      
       
       } else {
         res.render("index",{title: 'Home'});
      }


    } else {
       res.render("index", { title: "Home" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
})


router.get('/dashboard',isAuth , async(req,res,err)=>{

  if(err){
    console.log(err)
  }
const datas = await regModel.find().sort({ createdAt : -1 }); 
const Receipt = await studentReceipt.find().sort({ createdAt: -1 });

res.render("admin",{title:'AdminPanel', message: 'Admin', result: datas, receipt : Receipt});
});


router.post('/logout',(req,res)=>{
  req.session.destroy((err)=>{
    if(err) throw err;
    res.redirect('/');
  })
})
module.exports = router