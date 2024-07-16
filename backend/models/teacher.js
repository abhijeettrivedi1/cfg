const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const teacherSchema = new Schema(
    {
        teacherId: {
            type: String,
            unique: true,
            required: true
        },
        subject:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        isAdmin:{
            type: Boolean,
            default: false
        }
    }
)


const Teacher= mongoose.model('Teacher', teacherSchema);
module.exports=Teacher;
