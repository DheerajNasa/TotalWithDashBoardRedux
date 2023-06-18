const mysql = require("mysql");
const express = require("express");
const mongoose = require("mongoose")
const multer = require("multer");

const dotenv = require("dotenv");
dotenv.config();

const Students = require("../schema");

  let router = express.Router();
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now()+"_"+file.originalname);
    }
  })
  
  const upload = multer({ storage: storage });


  router.delete("/deleteUser",upload.none(),async(req,res)=>{
    try{
     let data = await Students.deleteMany({email:req.body.email})
           
              console.log(data)
              res.json("User Deleted Successfully") 
              }catch(error){
                console.log(error)
                res.json("Error in Saving Data")
              }
                               
  });

  let connectToMDB = async()=>{
    try{
       await mongoose.connect(process.env.dbUrl);
        console.log(`Connected to MDB`);
    }catch(error){
        console.log(error);
    }
  };




connectToMDB();

module.exports = router;