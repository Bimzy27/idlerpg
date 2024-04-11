import {ITaskBuilder} from "./TaskBuilder";
import {ItemRequirement, SkillRequirement} from "../../models/Requirement";
import {ItemReward, SkillReward} from "../../models/Reward";
import {ItemCost} from "../../models/Cost";
import {getExpFromLevel} from "../../models/Skill";

export const smithingTaskBuilder:ITaskBuilder =
{
    'smithing_bronze_bar':
        {
            name:'Smelt Bronze Bar',
            durationSeconds:5,
            requirements:[
                new ItemRequirement({id:'tin_ore', amount:1}),
                new ItemRequirement({id:'copper_ore', amount:1}),
            ],
            rewards:[
                new ItemReward({id: 'bronze_bar', amount: 1}),
                new SkillReward({id: 'smithing', exp: 6})
            ],
            costs:[
                new ItemCost({id:'tin_ore', amount:1}),
                new ItemCost({id:'copper_ore', amount:1}),
            ]
        },
    'smithing_bronze_dagger':
        {
            name:'Smith Bronze Dagger',
            durationSeconds:5,
            requirements:[
                new ItemRequirement({id:'bronze_bar', amount:1}),
                new SkillRequirement({id: 'smithing', exp: getExpFromLevel(1)})
            ],
            rewards:[
                new ItemReward({id: 'bronze_dagger', amount: 1}),
                new SkillReward({id: 'smithing', exp: 12})
            ],
            costs:[
                new ItemCost({id:'bronze_bar', amount:1}),
            ]
        },
    'smithing_bronze_scimitar':
        {
            name:'Smith Bronze Scimitar',
            durationSeconds:5,
            requirements:[
                new ItemRequirement({id:'bronze_bar', amount:2}),
                new SkillRequirement({id: 'smithing', exp: getExpFromLevel(5)})
            ],
            rewards:[
                new ItemReward({id: 'bronze_scimitar', amount: 1}),
                new SkillReward({id: 'smithing', exp: 25})
            ],
            costs:[
                new ItemCost({id:'bronze_bar', amount:2}),
            ]
        },
}