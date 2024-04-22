import {ItemReward, SkillReward} from "../../models/Reward";
import {SkillRequirement} from "../../models/Requirement";
import {getExpFromLevel} from "../../models/Skill";
import {ITaskBuilder} from "./TaskBuilder";

export const woodcuttingTaskBuilder:ITaskBuilder =
{

    'woodcutting_normal_log':
        {
            name:'Chop Normal Tree',
            intervalSeconds:4,
            requirements:[],
            rewards:[
                new ItemReward({id: 'normal_log', amount: 1}),
                new SkillReward({id: 'woodcutting', exp: 25})
            ],
            costs:[]
        },
    'woodcutting_oak_log':
        {
            name:'Chop Oak Tree',
            intervalSeconds:6,
            requirements:[
                new SkillRequirement({id: 'woodcutting', exp: getExpFromLevel(15)})
            ],
            rewards:[
                new ItemReward({id: 'oak_log', amount: 1}),
                new SkillReward({id: 'woodcutting', exp: 38})
            ],
            costs:[]
        },
    'woodcutting_willow_log':
        {
            name:'Chop Willow Tree',
            intervalSeconds:8,
            requirements:[
                new SkillRequirement({id: 'woodcutting', exp: getExpFromLevel(30)})
            ],
            rewards:[
                new ItemReward({id: 'willow_log', amount: 1}),
                new SkillReward({id: 'woodcutting', exp: 68})
            ],
            costs:[]
        },
    'woodcutting_maple_log':
        {
            name:'Chop Maple Tree',
            intervalSeconds:10,
            requirements:[
                new SkillRequirement({id: 'woodcutting', exp: getExpFromLevel(45)})
            ],
            rewards:[
                new ItemReward({id: 'maple_log', amount: 1}),
                new SkillReward({id: 'woodcutting', exp: 100})
            ],
            costs:[]
        },
    'woodcutting_yew_log':
        {
            name:'Chop Yew Tree',
            intervalSeconds:12,
            requirements:[
                new SkillRequirement({id: 'woodcutting', exp: getExpFromLevel(60)})
            ],
            rewards:[
                new ItemReward({id: 'yew_log', amount: 1}),
                new SkillReward({id: 'woodcutting', exp: 175})
            ],
            costs:[]
        },
    'woodcutting_magic_log':
        {
            name:'Chop Magic Tree',
            intervalSeconds:14,
            requirements:[
                new SkillRequirement({id: 'woodcutting', exp: getExpFromLevel(75)})
            ],
            rewards:[
                new ItemReward({id: 'magic_log', amount: 1}),
                new SkillReward({id: 'woodcutting', exp: 250})
            ],
            costs:[]
        },
    'woodcutting_redwood_log':
        {
            name:'Chop Redwood Tree',
            intervalSeconds:16,
            requirements:[
                new SkillRequirement({id: 'woodcutting', exp: getExpFromLevel(90)})
            ],
            rewards:[
                new ItemReward({id: 'redwood_log', amount: 1}),
                new SkillReward({id: 'woodcutting', exp: 380})
            ],
            costs:[]
        },
}