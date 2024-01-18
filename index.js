import { connectToDB } from './backend/config/database.js';
import app from './server.js'


const PORT = 5000;
app.listen(PORT, ()=>{
    console.log('\nServer listening at Port:', PORT);
    connectToDB();
})