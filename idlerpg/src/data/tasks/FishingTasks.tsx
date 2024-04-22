import {ITaskBuilder} from "./TaskBuilder";
import {ItemReward, SkillReward} from "../../models/Reward";

export const fishingTaskBuilder:ITaskBuilder =
    {
        'fishing_shrimp_raw':
            {
                name:'Fish Raw Shrimp',
                intervalSeconds:4,
                requirements:[],
                rewards:[
                    new ItemReward({id: 'shrimp_raw', amount: 1}),
                    new SkillReward({id: 'fishing', exp: 4})
                ],
                costs:[]
            },
    }