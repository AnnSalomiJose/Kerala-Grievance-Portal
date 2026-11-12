
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       dbName: "cm_kerala_grievance",
//     });

//     console.log("MongoDB Connected Successfully");
//     console.log("Database:", mongoose.connection.name);
//   } catch (error) {
//     console.error("MongoDB Connection Failed:", error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI is missing. Check Render Environment Variables.");
    }

    await mongoose.connect(mongoURI, {
      dbName: "cm_kerala_grievance",
    });

    console.log("MongoDB Connected Successfully");
    console.log("Database:", mongoose.connection.name);

  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
