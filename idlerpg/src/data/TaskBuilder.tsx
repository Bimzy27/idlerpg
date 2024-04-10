import {ITask} from "../models/Task";
import {ItemReward, SkillReward} from "../models/Reward";
import {SkillRequirement} from "../models/Requirement";
import {getExpFromLevel} from "../models/Skill";

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
            requirements:[],
            rewards:[]
        },

    //Woodcutting
    'woodcutting_chop_normal':
        {
            name:'Chop Normal Tree',
            durationSeconds:4,
            requirements:[],
            rewards:[
                new ItemReward({id: 'normal_log', amount: 1}),
                new SkillReward({id: 'woodcutting', exp: 25})
            ]
        },
    'woodcutting_chop_oak':
        {
            name:'Chop Oak Tree',
            durationSeconds:6,
            requirements:[
                new SkillRequirement({id: 'woodcutting', exp: getExpFromLevel(15)})
            ],
            rewards:[
                new ItemReward({id: 'oak_log', amount: 1}),
                new SkillReward({id: 'woodcutting', exp: 38})
            ]
        },
    'woodcutting_chop_willow':
        {
            name:'Chop Willow Tree',
            durationSeconds:8,
            requirements:[
                new SkillRequirement({id: 'woodcutting', exp: getExpFromLevel(30)})
            ],
            rewards:[
                new ItemReward({id: 'willow_log', amount: 1}),
                new SkillReward({id: 'woodcutting', exp: 68})
            ]
        },
    'woodcutting_chop_maple':
        {
            name:'Chop Maple Tree',
            durationSeconds:10,
            requirements:[
                new SkillRequirement({id: 'woodcutting', exp: getExpFromLevel(45)})
            ],
            rewards:[
                new ItemReward({id: 'maple_log', amount: 1}),
                new SkillReward({id: 'woodcutting', exp: 100})
            ]
        },
    'woodcutting_chop_yew':
        {
            name:'Chop Yew Tree',
            durationSeconds:12,
            requirements:[
                new SkillRequirement({id: 'woodcutting', exp: getExpFromLevel(60)})
            ],
            rewards:[
                new ItemReward({id: 'yew_log', amount: 1}),
                new SkillReward({id: 'woodcutting', exp: 175})
            ]
        },
    'woodcutting_chop_magic':
        {
            name:'Chop Magic Tree',
            durationSeconds:14,
            requirements:[
                new SkillRequirement({id: 'woodcutting', exp: getExpFromLevel(75)})
            ],
            rewards:[
                new ItemReward({id: 'magic_log', amount: 1}),
                new SkillReward({id: 'woodcutting', exp: 250})
            ]
        },
    'woodcutting_chop_redwood':
        {
            name:'Chop Redwood Tree',
            durationSeconds:16,
            requirements:[
                new SkillRequirement({id: 'woodcutting', exp: getExpFromLevel(90)})
            ],
            rewards:[
                new ItemReward({id: 'redwood_log', amount: 1}),
                new SkillReward({id: 'woodcutting', exp: 380})
            ]
        },

    //Mining
    'mining_pick_copper':
        {
            name:'Mine Copper Ore',
            durationSeconds:4,
            requirements:[],
            rewards:[
                new ItemReward({id: 'copper_ore', amount: 1}),
                new SkillReward({id: 'mining', exp: 18})
            ]
        },
    'mining_pick_tin':
        {
            name:'Mine Tin Ore',
            durationSeconds:4,
            requirements:[],
            rewards:[
                new ItemReward({id: 'tin_ore', amount: 1}),
                new SkillReward({id: 'mining', exp: 18})
            ]
        },
    'mining_pick_iron':
        {
            name:'Mine Iron Ore',
            durationSeconds:6,
            requirements:[
                new SkillRequirement({id: 'mining', exp: getExpFromLevel(15)})
            ],
            rewards:[
                new ItemReward({id: 'iron_ore', amount: 1}),
                new SkillReward({id: 'mining', exp: 35})
            ]
        },
    'mining_pick_silver':
        {
            name:'Mine Silver Ore',
            durationSeconds:8,
            requirements:[
                new SkillRequirement({id: 'mining', exp: getExpFromLevel(20)})
            ],
            rewards:[
                new ItemReward({id: 'silver_ore', amount: 1}),
                new SkillReward({id: 'mining', exp: 40})
            ]
        },
    'mining_pick_coal':
        {
            name:'Mine Coal Ore',
            durationSeconds:8,
            requirements:[
                new SkillRequirement({id: 'mining', exp: getExpFromLevel(30)})
            ],
            rewards:[
                new ItemReward({id: 'coal_ore', amount: 1}),
                new SkillReward({id: 'mining', exp: 50})
            ]
        },
    'mining_pick_gold':
        {
            name:'Mine Gold Ore',
            durationSeconds:10,
            requirements:[
                new SkillRequirement({id: 'mining', exp: getExpFromLevel(40)})
            ],
            rewards:[
                new ItemReward({id: 'gold_ore', amount: 1}),
                new SkillReward({id: 'mining', exp: 65})
            ]
        },
    'mining_pick_mithril':
        {
            name:'Mine Mithril Ore',
            durationSeconds:12,
            requirements:[
                new SkillRequirement({id: 'mining', exp: getExpFromLevel(55)})
            ],
            rewards:[
                new ItemReward({id: 'mithril_ore', amount: 1}),
                new SkillReward({id: 'mining', exp: 80})
            ]
        },
    'mining_pick_adamantite':
        {
            name:'Mine Adamantite Ore',
            durationSeconds:14,
            requirements:[
                new SkillRequirement({id: 'mining', exp: getExpFromLevel(70)})
            ],
            rewards:[
                new ItemReward({id: 'adamantite_ore', amount: 1}),
                new SkillReward({id: 'mining', exp: 95})
            ]
        },
    'mining_pick_runite':
        {
            name:'Mine Runite Ore',
            durationSeconds:16,
            requirements:[
                new SkillRequirement({id: 'mining', exp: getExpFromLevel(85)})
            ],
            rewards:[
                new ItemReward({id: 'runite_ore', amount: 1}),
                new SkillReward({id: 'mining', exp: 125})
            ]
        },
};

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