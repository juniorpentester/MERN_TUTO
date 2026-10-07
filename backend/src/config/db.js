import mongoose from "mongoose";
import dns from "dns";

// const connectToMongoDB = async () => {
//   try {
//     dns.setServers(["8.8.8.8", "1.1.1.1"]);
//     await mongoose.connect(
//       process.env.MONGODB_URI ||
//         "mongodb+srv://jeanregis1519_db_user:<db_password>@cluster0.fgjnqba.mongodb.net/?appName=Cluster0",
//     );
//     console.log("You successfully connected to MongoDB!");
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err);
//   }
// };

// export default connectToMongoDB;

export async function connectToMongoDB() {
  try {
    dns.setServers(["8.8.4.4", "1.1.1.1"]);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("You successfully connected to MongoDB!");
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
// export async function disconnectFromMongoDB() {
//   await mongoose.connection.close();
// }
