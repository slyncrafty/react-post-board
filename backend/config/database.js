import mongoose from 'mongoose'

// Connect to MongoDB using connection string from env variable
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      dbName: "posting"
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
