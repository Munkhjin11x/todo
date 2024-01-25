    import mongoose from "mongoose";

   
const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: {
        type: String,
        enum: ['todo', 'completed', 'inProgress'],
        default: 'todo'
    }
});
    const taskModel = mongoose.model('task',taskSchema)

    export  {taskModel}