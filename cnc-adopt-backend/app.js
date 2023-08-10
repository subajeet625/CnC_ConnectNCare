const express = require("express"); 
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const {mongoUrl} = require("./keys");
mongoose.connect(mongoUrl);
const cors = require("cors");
app.use(cors())

require('./models/model')
require('./models/post')
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/createpost"))
app.use(require("./routes/user"))
mongoose.connection.on("connected",()=>{
    console.log("successfully connected to mongo")
})
app.listen(port,(req,res)=>{
    console.log("server is running on port" + " "+ port);
})