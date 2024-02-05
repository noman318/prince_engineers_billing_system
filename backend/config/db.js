import Mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const conn = await Mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Prince_Engg_Billing_System",
    });
    console.log(
      `MongoDb connected Successfully ${conn.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log("Error While connecting to MongoDb".red);
    process.exit(1);
  }
};

export default connectToDB;
