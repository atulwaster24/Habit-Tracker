import { HabitModel, dateSchema } from "./app.model.js";
import { addHabitRepo, deleteHabitRepo, getDetailsRepo, getHabitsRepo, updateDayStatusRepo, updateStatusRepo } from "./app.repository.js";

export const getHabits = async (req, res, next)=>{
    try {
        const habitsRetrieved = await getHabitsRepo();
        res.render('index', {data: habitsRetrieved});
    } catch (error) {
        return res.send(error.message);
    }
}

function createArrayForLastSevenDays(){
    const lastWeek = [];
    for(let i = 0; i < 7; i++){
        let month = new Date().getMonth() + 1;
        let date = new Date().getDate() - i;
        let year = new Date().getFullYear();
        let status = 'Unknown';

        let dateData= {date:`${date}-${month}-${year}`, status: status};
        lastWeek.push(dateData);
    }
    return lastWeek;
}

export const addHabit = async (req, res, next)=>{
    try {
        const weekStatus = createArrayForLastSevenDays();
        const habitTitle = req.body.habit;

        const habit = await addHabitRepo({
            title: habitTitle,
            streak: 0,
            status: 'Unknown',
            lastSevenDays: weekStatus
        })
        res.redirect('/');
    } catch (error) {
        console.log(error)
    }
}

export const deleteHabit = async (req, res, next)=>{
    try {
        const itemId = req.params.id;
        const deletedHabit = await deleteHabitRepo(itemId);
        res.redirect('/');
        
    } catch (error) {
        console.log(error)
    }

}

export const details = async (req, res, next)=>{

    const id = req.params.id;

    const detailsRetrieved = await getDetailsRepo(id);

    return res.render('details', {data: detailsRetrieved});
}

export const updateStatus = async (req, res, next)=>{
    try {
        const id = req.params.id;
        const status = req.params.status;

        const update = await updateStatusRepo({id, status});
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

export const updateDayStatus = async (req, res, next)=>{
    try {
        const day_id = req.params.day_id;
        const item_id = req.params.data_id;
        const status = req.params.status;

        const update = await updateDayStatusRepo({item_id,day_id, status});
        const details = await getDetailsRepo(item_id);
        res.render(`details`, {data: details});
    } catch (error) {
        console.log(error);
    }
}