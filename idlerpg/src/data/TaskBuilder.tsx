import {ITask} from "../models/Task";
import {ItemReward} from "../models/Reward";

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
            rewards:[
                new ItemReward({id: 'normal_log', amount: 1})
            ]
        },
    'woodcutting_chop_oak':
        {
            name:'Chop Oak Tree',
            durationSeconds:5,
            rewards:[
                new ItemReward({id: 'oak_log', amount: 1})
            ]
        },
};

export default taskBuilder;