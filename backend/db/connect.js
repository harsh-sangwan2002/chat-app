import mongoose from "mongoose";

const connect = async () => {

    try {

        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB.");

    } catch (err) {
        console.log("Error connecting to MongoDB", err.message);
    }
}

export default connect;