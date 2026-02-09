import mongoose from 'mongoose'

const connectDB = async ()=>{
    try {
     const connectionInstance =  await mongoose.connect(process.env.MONGO_URI)
     console.log(`MongoDB connection Successful !! \nDB HOST :${connectionInstance.connection.host}`);
     

    } catch (error) {
        console.log(`Mongo DB connection Error : ${error}`);
        process.exit(1)
        
    }
}

export default connectDB;