const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    
    
    date : {
        type:String,
        require:true
    },
    subject : {
        type:String,
        require:true
    },
    description : {
        type:String,
        require:true,
        
    },
    email : {
        type:String,
        require:true,
    },
    contactno : {
        type:Number,
        require:true,
        unique:true
    },
    smsno: {
        type:Number,
        require:true
    },
    days7: {
        type:Number,
        require:true
    }
})

const Register = new mongoose.model("Register", studentSchema);

module.exports = Register;