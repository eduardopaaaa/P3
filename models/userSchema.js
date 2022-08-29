const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {

    
    library: String,
    book: String,
    card: String,
    image: String,
    readCheck: {type:Boolean, default: false}

}
);



const userSchema = mongoose.model('userSchema', schema);

module.exports = userSchema;




