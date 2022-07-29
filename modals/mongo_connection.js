const mongoose = require('mongoose');

module.exports.initMongoConnection = async () => {
const uri = "mongodb+srv://angular_root_user:rishi143@angular-node-db.wvist.mongodb.net/?retryWrites=true&w=majority";
  await mongoose.connect(uri, (res, err) => {
      console.log('connected to mongodb');
   }).catch((err) => {
      console.log('connection to mongodb failed') 
   });
   return mongoose.connect(uri);
};