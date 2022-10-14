var express = require('express');
var router = express.Router();
const regModel = require('../models/reg')
const receiptModel = require('../models/receipt')
/* posting the receipts */

router.post('/', async(req,res)=>{

  try {
    const FindstudentID = await regModel.findOne({studentID:req.body.studentID})
    console.log(FindstudentID)
    if(FindstudentID){
      const student = new receiptModel(req.body)
      student
        .save()
        .then((result) => {
          console.log(`new receipt recorded`)
          console.log(result)
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else{
      res.send('student PDS.ID is not registered')
    }
  } catch (error) {
    res.send(error)
    console.log(error)
  }
})
module.exports = router;
