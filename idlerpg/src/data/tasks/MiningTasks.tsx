import {ITaskBuilder} from "./TaskBuilder";
import {SkillRequirement} from "../../models/Requirement";
import {ItemReward, SkillReward} from "../../models/Reward";
import {getExpFromLevel} from "../../models/Skill";

export const miningTaskBuilder:ITaskBuilder =
    {
        'mining_copper_ore':
            {
                name:'Mine Copper Ore',
                intervalSeconds:4,
                requirements:[],
                rewards:[
                    new ItemReward({id: 'copper_ore', amount: 1}),
                    new SkillReward({id: 'mining', exp: 18})
                ],
                costs:[]
            },
        'mining_tin_ore':
            {
                name:'Mine Tin Ore',
                intervalSeconds:4,
                requirements:[],
                rewards:[
                    new ItemReward({id: 'tin_ore', amount: 1}),
                    new SkillReward({id: 'mining', exp: 18})
                ],
                costs:[]
            },
        'mining_iron_ore':
            {
                name:'Mine Iron Ore',
                intervalSeconds:6,
                requirements:[
                    new SkillRequirement({id: 'mining', exp: getExpFromLevel(15)})
                ],
                rewards:[
                    new ItemReward({id: 'iron_ore', amount: 1}),
                    new SkillReward({id: 'mining', exp: 35})
                ],
                costs:[]
            },
        'mining_silver_ore':
            {
                name:'Mine Silver Ore',
                intervalSeconds:8,
                requirements:[
                    new SkillRequirement({id: 'mining', exp: getExpFromLevel(20)})
                ],
                rewards:[
                    new ItemReward({id: 'silver_ore', amount: 1}),
                    new SkillReward({id: 'mining', exp: 40})
                ],
                costs:[]
            },
        'mining_coal_ore':
            {
                name:'Mine Coal Ore',
                intervalSeconds:8,
                requirements:[
                    new SkillRequirement({id: 'mining', exp: getExpFromLevel(30)})
                ],
                rewards:[
                    new ItemReward({id: 'coal_ore', amount: 1}),
                    new SkillReward({id: 'mining', exp: 50})
                ],
                costs:[]
            },
        'mining_gold_ore':
            {
                name:'Mine Gold Ore',
                intervalSeconds:10,
                requirements:[
                    new SkillRequirement({id: 'mining', exp: getExpFromLevel(40)})
                ],
                rewards:[
                    new ItemReward({id: 'gold_ore', amount: 1}),
                    new SkillReward({id: 'mining', exp: 65})
                ],
                costs:[]
            },
        'mining_mithril_ore':
            {
                name:'Mine Mithril Ore',
                intervalSeconds:12,
                requirements:[
                    new SkillRequirement({id: 'mining', exp: getExpFromLevel(55)})
                ],
                rewards:[
                    new ItemReward({id: 'mithril_ore', amount: 1}),
                    new SkillReward({id: 'mining', exp: 80})
                ],
                costs:[]
            },
        'mining_adamantite_ore':
            {
                name:'Mine Adamantite Ore',
                intervalSeconds:14,
                requirements:[
                    new SkillRequirement({id: 'mining', exp: getExpFromLevel(70)})
                ],
                rewards:[
                    new ItemReward({id: 'adamantite_ore', amount: 1}),
                    new SkillReward({id: 'mining', exp: 95})
                ],
                costs:[]
            },
        'mining_runite_ore':
            {
                name:'Mine Runite Ore',
                intervalSeconds:16,
                requirements:[
                    new SkillRequirement({id: 'mining', exp: getExpFromLevel(85)})
                ],
                rewards:[
                    new ItemReward({id: 'runite_ore', amount: 1}),
                    new SkillReward({id: 'mining', exp: 125})
                ],
                costs:[]
            },
    }