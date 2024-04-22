import {ITask} from "../../models/Task";
import {smithingTaskBuilder} from "./SmithingTasks";
import {woodcuttingTaskBuilder} from "./WoodcuttingTasks";
import {miningTaskBuilder} from "./MiningTasks";
import {cookingTaskBuilder} from "./CookingTasks";
import {fishingTaskBuilder} from "./FishingTasks";

export interface ITaskBuilder
{
    [id:string]:ITask;
}

const taskBuilder:ITaskBuilder =
{
    'none':
        {
            name:'No Task',
            intervalSeconds:0,
            requirements:[],
            rewards:[],
            costs:[]
        },
    ...miningTaskBuilder,
    ...smithingTaskBuilder,
    ...woodcuttingTaskBuilder,
    ...cookingTaskBuilder,
    ...fishingTaskBuilder,
}

export const getTaskId = (task:ITask) => {
    for (const id in taskBuilder) {
        if (taskBuilder[id] === task) {
            return id;
        }
    }
    throw new Error('Task not found in taskBuilder');
};

export default taskBuilder;