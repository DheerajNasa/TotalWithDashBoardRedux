const mysql = require("mysql");
const express = require("express");
const multer = require("multer");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");

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

              
router.post("/validatelogin", upload.single("profilePic"), async (req, res) => {
    let data = await Students.find({ email: req.body.email});
    
  
    console.log(data);
    // console.log(results);
    try {
      let isValidPassword = await bcrypt.compare(req.body.password,data[0].password);
      if (isValidPassword ==  true) {

       
      let jwtToken = await jwt.sign({_id:data[0]._id},"BRN");
         console.log(jwtToken);


        res.json({
          email: data[0].email,
          name: data[0].name,
          profilePic: data[0].profilePic,
          isLoggedIn: true,
          token:jwtToken,
        });
      } else {
        res.json({
          msg: "Invalid username and password",
          isLoggedIn: false,
        });
      }
    } catch (error) {
      res.json(error);
    }
    console.log(data[0]);
    console.log(data[0].profilePic);
  
  
   });

router.post("/validateToken",upload.none(),async(req,res)=>{

  let receivedToken = req.body.token;
  try{
  let generatedId = await jwt.verify(receivedToken,"BRN");
  console.log(generatedId);
  let data = await Students.find( {_id:generatedId});
  
  if(data){
    res.json({
      email: data[0].email,
      name: data[0].name,
      profilePic: data[0].profilePic,
      isLoggedIn: true,
    });
  }else{
    res.json({error:"Invalid Token"})
  }
  
    
  }catch (err) {
    res.json({ error: err.message });
    }

})

  
    let connectToMDB = async()=>{
    try{ 
        await mongoose.connect(process.env.dbUrl);
        console.log("Connected to MDB");
    }catch(error){
        console.log(error);
        console.log("Cannot connect to MDB")
    }
  };


connectToMDB();

module.exports = router;