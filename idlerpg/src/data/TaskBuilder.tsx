import {ITask} from "../models/Task";

interface ITaskBuilder
{
    [id:string]:ITask
}

const taskBuilder:ITaskBuilder =
{
    'none':
        {
            name:'No Task',
            durationSeconds:0,
            rewards:[]
        },
    'woodcutting_chop_normal':
        {
            name:'Chop Normal Tree',
            durationSeconds:3,
            rewards:[]
        },
    'woodcutting_chop_oak':
        {
            name:'Chop Oak Tree',
            durationSeconds:5,
            rewards:[]
        },
};

export default taskBuilder;