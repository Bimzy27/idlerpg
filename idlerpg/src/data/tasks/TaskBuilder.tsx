import {ITask} from "../../models/Task";
import {smithingTaskBuilder} from "./SmithingTasks";
import {woodcuttingTaskBuilder} from "./WoodcuttingTasks";
import {miningTaskBuilder} from "./MiningTasks";

export interface ITaskBuilder
{
    [id:string]:ITask;
}

const taskBuilder:ITaskBuilder =
{
    'none':
        {
            name:'No Task',
            durationSeconds:0,
            requirements:[],
            rewards:[],
            costs:[]
        },
    ...miningTaskBuilder,
    ...smithingTaskBuilder,
    ...woodcuttingTaskBuilder,
}

export const getTaskId = (task: any) => {
    const taskAsITask = task as ITask;
    for (const id in taskBuilder) {
        if (taskBuilder[id] === taskAsITask) {
            return id;
        }
    }
    throw new Error('Task not found in taskBuilder');
};

export default taskBuilder;