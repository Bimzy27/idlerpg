import {ITaskBuilder} from "./TaskBuilder";
import {ItemReward, SkillReward} from "../../models/Reward";
import {ItemRequirement} from "../../models/Requirement";
import {ItemCost} from "../../models/Cost";

export const cookingTaskBuilder:ITaskBuilder =
    {
        'cooking_shrimp':
            {
                name:'Cook Raw Shrimp',
                intervalSeconds:3,
                requirements:[
                    new ItemRequirement({id:'shrimp_raw', amount:1}),
                ],
                rewards:[
                    new ItemReward({id: 'shrimp', amount: 1}),
                    new SkillReward({id: 'cooking', exp: 30})
                ],
                costs:[
                    new ItemCost({id:'shrimp_raw', amount:1}),
                ]
            },
        'cooking_meat':
            {
                name:'Cook Raw Meat',
                intervalSeconds:3,
                requirements:[
                    new ItemRequirement({id:'meat_raw', amount:1}),],
                rewards:[
                    new ItemReward({id: 'meat', amount: 1}),
                    new SkillReward({id: 'cooking', exp: 30})
                ],
                costs:[
                    new ItemCost({id:'meat_raw', amount:1}),
                ]
            },
        'cooking_chicken':
            {
                name:'Cook Raw Chicken',
                intervalSeconds:3,
                requirements:[
                    new ItemRequirement({id:'chicken_raw', amount:1}),
                ],
                rewards:[
                    new ItemReward({id: 'chicken', amount: 1}),
                    new SkillReward({id: 'cooking', exp: 30})
                ],
                costs:[
                    new ItemCost({id:'chicken_raw', amount:1}),
                ]
            },
    }