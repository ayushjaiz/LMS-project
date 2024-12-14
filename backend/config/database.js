import mongoose from "mongoose";

// Set the strictQuery option before connecting to MongoDB
mongoose.set('strictQuery', false);

const connectToMongoDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_ATLAS_URL);
    console.log(`Connected to MongoDB with ${connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export { connectToMongoDB };
