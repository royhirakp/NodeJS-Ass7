const mongoose = require('mongoose');


const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({ 
    id : Number,   
    name: { type: String, require: true},
    currentClass: { type: Number, required: true },
    division:{type: String, required: true }
})
const User = mongoose.model("student", BlogPost);


//*************************************************** */
// Function for put the data to the database 
const studentData = require("../src/InitialData")
async function main() {
    await mongoose.connect('mongodb://localhost/Ass7');
    console.log('Connected successfully to server');
    try {     // TO ADDTHE STUDENT DATA TO THE DATABASE 
        const _user_ = await User.create(studentData)       
    } catch (e) {
        console.log(e.message)
    }
    return 'done.';  //***************retuen a o/p: that the collection is created and all the code of this main() is excuted********* */
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => mongoose.disconnect());
    module.exports = User;