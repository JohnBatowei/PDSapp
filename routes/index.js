var express = require('express');
var router = express.Router();
let regModel = require('../models/reg')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.post('/registeration', (req,res)=>{
  const Register = new regModel(req.body);
  Register.save()
  .then((data)=>{
    res.redirect('/')
   console.log('new record')
  }).catch((err)=>{
    console.log(err)
  });

})

module.exports = router;
