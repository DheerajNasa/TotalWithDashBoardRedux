const mysql = require("mysql");
const express = require("express");
const multer = require("multer");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")

const dotenv = require("dotenv");
dotenv.config();

let router = express.Router();

const Students = require("../schema");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now()+"_"+file.originalname);
    }
  })
  
  const upload = multer({ storage: storage });

  


  router.patch("/updateUser",upload.single("profilePic"),async(req,res)=>{

    console.log("inside update user apiep")

    let hashedPassword =await bcrypt.hash(req.body.password,10)
    try{
     let data = await Students.find({email:req.body.email})
                            .updateMany({name:req.body.name,
                                password:hashedPassword,
                                profilePic:req.file.path,});
           
              console.log(data)
              res.json("User Updated Successfully") 
              }catch(error){
                console.log(error)
                console.log("Error in Saving Data")
              }
            
                                
  });

  let connectToMDB = async()=>{
    try{
        await mongoose.connect(process.env.dbUrl);
        console.log("Connected to MDB");
    }catch(error){
        console.log(error);
    }
  };

 
  

connectToMDB();
module.exports = router;