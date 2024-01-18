import mongoose from "mongoose";


let URL = 'mongodb://localhost:27017/HabitsDB'
export const connectToDB = async () =>{
    try {
        await mongoose.connect(URL);
        console.log("Connection To MongoDB successful.")

    } catch (error) {
        console.log(error);
        console.log("Connection to database failed.")
    }
}