import { HabitModel} from "./app.model.js"

export const getHabitsRepo = async () =>{   
    try {
        const habits = await HabitModel.find();
        return habits;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

export const addHabitRepo = async (data) =>{
    try {
        const habit = await new HabitModel(data);
        await habit.save();
        return await HabitModel.find();
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getDetailsRepo = async (id)=>{
    try {
        const habitToFetch = await HabitModel.findById(id);
        return habitToFetch;
    } catch (error) {
        console.log(error)
    }
}

export const deleteHabitRepo = async (id) =>{   
    try {
        const habit = await HabitModel.findByIdAndDelete(id);
        if(habit){
            return habit;
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateStatusRepo = async (data)=>{
    try {
        const update = await HabitModel.findByIdAndUpdate({_id: data.id}, {$set: {status: data.status, 'lastSevenDays.0.status': data.status}}, {new: true});
        return update;
    } catch (error) {
        console.log(error);
    }
}

export const updateDayStatusRepo = async (data)=>{
    try {
        const item_data = await HabitModel.findById(data.item_id);
        const updatedLastSevenDays = item_data.lastSevenDays.map((day, index)=>{
            if(day._id.toString() == data.day_id){
                if(index === 0){
                    updateStatusRepo({id:data.item_id, status: data.status})
                }
                day.status = data.status;
                return day;

            }
            return day;
        })

        const update = await HabitModel.findOneAndUpdate({_id: data.item_id}, {$set: {lastSevenDays: updatedLastSevenDays}},{new: true})
        return update;
    } catch (error) {
        console.log(error);
    }
}