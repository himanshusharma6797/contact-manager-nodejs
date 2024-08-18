import mongoose from "mongoose";

const connectDb = async () => {
    try {
        // const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('DB Connected');
        console.log('connection.host', connect.connection.host);
        console.log('connection.name', connect.connection.name);
    }
    catch (err) {
        console.log('err',err);
        process.exit(1);
    }
}

export default connectDb