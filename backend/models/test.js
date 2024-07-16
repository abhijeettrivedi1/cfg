const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const testSchema = new Schema({
    langType: {type: String,
        required: true
    },
    referenceText: [{type: String}],
    level: {type: Number, required: true}
})
const Test= mongoose.model('Test', testSchema);
module.exports=Test;
