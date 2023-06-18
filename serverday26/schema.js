const mongoose = require("mongoose");

let studentSchema = new mongoose.Schema({
    
   

    name:{
        type:String,
        required:true,
        trim:true,
        lowercase: true,
        minLength:[2,"Yadava ni peeru type chei ra"],
        maxLength:[25,"Yadava ni peeru type cheyamananu ni biography adagale"],
    },


    age:{
        type:Number,
        
        min:[18,"Chinna baitiki poi adukho neeku enduku ee account"],
        max:[80,"sir mi grandchildren tho adukondi account vadhu sir please"],
    },

    email:{
        type:String,
        required:true,
        validate:{
        validator: function(v) {
              return  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
            },
        message: props => `${props.value} is not a valid email address!`
        }
    },


    password:{
        type:String,
        required:true,
    },

    gender:{
        type:String,
        lowercase: true,
        enum: ["male", "female"]
        
    },


    maritalStatus:{
        type:String,
        // lowercase: true,
        // enum: ["single", "married"]
        
    },

    country:{
    type:String,
    
    lowercase: true
    },

  
    profilePic: String,

});

 let Students = new mongoose.model("students",studentSchema);

 module.exports = Students;