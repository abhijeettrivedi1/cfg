const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const studentSchema = new Schema({
    studentName:{
        type:String,
        
    },
    studentRollNo:{
        type: String,
        required : true,
        unique: true
    },
    level:{
        type: Number,
        default: 0
    },
    standard: {
        type: Number,
        required: true,
        default : 1
    },
   teachers:[
    {type: String, required: true}
    ]
})
const Student= mongoose.model('Student', studentSchema);
module.exports=Student;