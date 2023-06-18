
const express = require("express");
const cors = require("cors");

let app =express();
app.use(cors());


const signUpRouter = require("./routes/SignUpRoute");
app.use("/",signUpRouter);

const loginRouter = require("./routes/LoginRoute");
app.use("/",loginRouter);

const updateRouter = require("./routes/UpdateRoute");
app.use("/",updateRouter);

const deleteRouter = require("./routes/DeleteRoute");
app.use("/",deleteRouter);



app.listen(1008,()=>{
    console.log("Listening to port 1008")
})



