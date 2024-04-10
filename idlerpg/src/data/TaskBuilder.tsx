import {ITask} from "../models/Task";
import {ItemReward, SkillReward} from "../models/Reward";

interface ITaskBuilder
{
    [id:string]:ITask;
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
                new ItemReward({id: 'normal_log', amount: 1}),
                new SkillReward({id: 'woodcutting', exp: 25})
            ]
        },
    'woodcutting_chop_oak':
        {
            name:'Chop Oak Tree',
            durationSeconds:5,
            rewards:[
                new ItemReward({id: 'oak_log', amount: 1}),
                new SkillReward({id: 'woodcutting', exp: 38})
            ]
        },
    'woodcutting_chop_willow':
        {
            name:'Chop Willow Tree',
            durationSeconds:10,
            rewards:[
                new ItemReward({id: 'willow_log', amount: 1}),
                new SkillReward({id: 'woodcutting', exp: 68})
            ]
        }
};

export const getTaskId = (task: any) => {
    const taskAsITask = task as ITask; // Type assertion
    // Access the id property from the object key in the taskBuilder map
    for (const id in taskBuilder) {
        if (taskBuilder[id] === taskAsITask) {
            return id;
        }
    }
    throw new Error('Task not found in taskBuilder');
};

export default taskBuilder;