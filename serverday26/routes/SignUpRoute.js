const mysql = require("mysql");
const express = require("express");
const multer = require("multer");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const Students = require("../schema");

let router = express.Router();

router.use("/uploads",express.static("uploads"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now()+"_"+file.originalname);
    }
  })
  
  const upload = multer({ storage: storage });

  
router.post("/signUp",upload.single("profilePic"),async(req,res)=>{
    let hashedPassword =await bcrypt.hash(req.body.password,10)
     let data = await Students({name:req.body.name,
                                email:req.body.email,
                                password:hashedPassword,
                                age:req.body.age,
                                gender:req.body.gender,
                                country:req.body.country,
                                maritalStatus:req.body.maritalStatus,
                                profilePic:req.file.path});
           
              try{
                Students.insertMany([data]);
              }catch(error){
                console.log(error)
                console.log("Error in Saving Data")
              }
              console.log(data);
              res.json("User Created Successfully")                  
  });
              
  
  
    let connectToMDB = async()=>{
    try{
        await mongoose.connect(process.env.dbUrl);
        console.log("Connected to MDB");
    }catch(error){
      console.log("Cannot connect to MDB")
        console.log(error);
        console.log("Cannot connect to MDB")
    }
  };

connectToMDB();

module.exports = router;