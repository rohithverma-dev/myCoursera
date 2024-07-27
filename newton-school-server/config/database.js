import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URI)
  .then((data)=>{
      console.log(`mongoDb connected to server ${data.connection.host}`);
  }).catch((err)=>{
    console.log("mongoDb connection Fail");
  })
};




// password below
// k7dwd5nrcNzFMyOW


















// MONGO_URI=mongodb+srv://rv171614:gbc3ofg4FuDooCpa@cluster0.czrt84y.mongodb.net/newtonschool?retryWrites=true





