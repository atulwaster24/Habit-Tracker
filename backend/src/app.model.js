import mongoose from "mongoose";

export const dateSchema = mongoose.Schema({
    date: String,
    status: String
});

const habitSchema = mongoose.Schema({
    title: String,
    streak: {type: Number, default: 0},
    status: { type: String, enum: ['Completed', 'Incomplete', 'Unknown'], default: 'Unknown'},
    lastSevenDays :[{type: dateSchema}]
})


export const HabitModel = mongoose.model('Habit',habitSchema);