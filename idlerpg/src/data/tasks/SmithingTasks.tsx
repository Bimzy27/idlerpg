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
            intervalSeconds:5,
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
            intervalSeconds:5,
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
            intervalSeconds:5,
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
    'smithing_iron_bar':
        {
            name:'Smelt Iron Bar',
            intervalSeconds:5,
            requirements:[
                new ItemRequirement({id:'iron_ore', amount:1}),
                new SkillRequirement({id: 'smithing', exp: getExpFromLevel(15)})
            ],
            rewards:[
                new ItemReward({id: 'iron_bar', amount: 1}),
                new SkillReward({id: 'smithing', exp: 13})
            ],
            costs:[
                new ItemCost({id:'iron_ore', amount:1}),
            ]
        },
    'smithing_iron_dagger':
        {
            name:'Smith Iron Dagger',
            intervalSeconds:5,
            requirements:[
                new ItemRequirement({id:'iron_bar', amount:1}),
                new SkillRequirement({id: 'smithing', exp: getExpFromLevel(15)})
            ],
            rewards:[
                new ItemReward({id: 'iron_dagger', amount: 1}),
                new SkillReward({id: 'smithing', exp: 25})
            ],
            costs:[
                new ItemCost({id:'iron_bar', amount:1}),
            ]
        },
    'smithing_iron_scimitar':
        {
            name:'Smith Iron Scimitar',
            intervalSeconds:5,
            requirements:[
                new ItemRequirement({id:'iron_bar', amount:2}),
                new SkillRequirement({id: 'smithing', exp: getExpFromLevel(20)})
            ],
            rewards:[
                new ItemReward({id: 'iron_scimitar', amount: 1}),
                new SkillReward({id: 'smithing', exp: 50})
            ],
            costs:[
                new ItemCost({id:'iron_bar', amount:2}),
            ]
        },
    'smithing_steel_bar':
        {
            name:'Smelt Steel Bar',
            intervalSeconds:5,
            requirements:[
                new ItemRequirement({id:'iron_ore', amount:1}),
                new ItemRequirement({id:'coal_ore', amount:2}),
                new SkillRequirement({id: 'smithing', exp: getExpFromLevel(30)})
            ],
            rewards:[
                new ItemReward({id: 'steel_bar', amount: 1}),
                new SkillReward({id: 'smithing', exp: 18})
            ],
            costs:[
                new ItemCost({id:'iron_ore', amount:1}),
                new ItemCost({id:'coal_ore', amount:2}),
            ]
        },
    'smithing_steel_dagger':
        {
            name:'Smith Steel Dagger',
            intervalSeconds:5,
            requirements:[
                new ItemRequirement({id:'steel_bar', amount:1}),
                new SkillRequirement({id: 'smithing', exp: getExpFromLevel(30)})
            ],
            rewards:[
                new ItemReward({id: 'steel_dagger', amount: 1}),
                new SkillReward({id: 'smithing', exp: 38})
            ],
            costs:[
                new ItemCost({id:'steel_bar', amount:1}),
            ]
        },
    'smithing_steel_scimitar':
        {
            name:'Smith Steel Scimitar',
            intervalSeconds:5,
            requirements:[
                new ItemRequirement({id:'steel_bar', amount:2}),
                new SkillRequirement({id: 'smithing', exp: getExpFromLevel(35)})
            ],
            rewards:[
                new ItemReward({id: 'steel_scimitar', amount: 1}),
                new SkillReward({id: 'smithing', exp: 75})
            ],
            costs:[
                new ItemCost({id:'steel_bar', amount:2}),
            ]
        },
    'smithing_mithril_bar':
        {
            name:'Smelt Mithril Bar',
            intervalSeconds:5,
            requirements:[
                new ItemRequirement({id:'mithril_ore', amount:1}),
                new ItemRequirement({id:'coal_ore', amount:4}),
                new SkillRequirement({id: 'smithing', exp: getExpFromLevel(50)})
            ],
            rewards:[
                new ItemReward({id: 'mithril_bar', amount: 1}),
                new SkillReward({id: 'smithing', exp: 30})
            ],
            costs:[
                new ItemCost({id:'mithril_ore', amount:1}),
                new ItemCost({id:'coal_ore', amount:4}),
            ]
        },
    'smithing_mithril_dagger':
        {
            name:'Smith Mithril Dagger',
            intervalSeconds:5,
            requirements:[
                new ItemRequirement({id:'mithril_bar', amount:1}),
                new SkillRequirement({id: 'smithing', exp: getExpFromLevel(50)})
            ],
            rewards:[
                new ItemReward({id: 'mithril_dagger', amount: 1}),
                new SkillReward({id: 'smithing', exp: 50})
            ],
            costs:[
                new ItemCost({id:'mithril_bar', amount:1}),
            ]
        },
    'smithing_mithril_scimitar':
        {
            name:'Smith Mithril Scimitar',
            intervalSeconds:5,
            requirements:[
                new ItemRequirement({id:'mithril_bar', amount:2}),
                new SkillRequirement({id: 'smithing', exp: getExpFromLevel(55)})
            ],
            rewards:[
                new ItemReward({id: 'mithril_scimitar', amount: 1}),
                new SkillReward({id: 'smithing', exp: 100})
            ],
            costs:[
                new ItemCost({id:'mithril_bar', amount:2}),
            ]
        },
    'smithing_adamantite_bar':
        {
            name:'Smelt Adamantite Bar',
            intervalSeconds:5,
            requirements:[
                new ItemRequirement({id:'adamantite_ore', amount:1}),
                new ItemRequirement({id:'coal_ore', amount:6}),
                new SkillRequirement({id: 'smithing', exp: getExpFromLevel(70)})
            ],
            rewards:[
                new ItemReward({id: 'adamantite_bar', amount: 1}),
                new SkillReward({id: 'smithing', exp: 38})
            ],
            costs:[
                new ItemCost({id:'adamantite_ore', amount:1}),
                new ItemCost({id:'coal_ore', amount:6}),
            ]
        },
    'smithing_adamant_dagger':
        {
            name:'Smith Adamant Dagger',
            intervalSeconds:5,
            requirements:[
                new ItemRequirement({id:'adamantite_bar', amount:1}),
                new SkillRequirement({id: 'smithing', exp: getExpFromLevel(70)})
            ],
            rewards:[
                new ItemReward({id: 'adamant_dagger', amount: 1}),
                new SkillReward({id: 'smithing', exp: 63})
            ],
            costs:[
                new ItemCost({id:'adamantite_bar', amount:1}),
            ]
        },
    'smithing_adamant_scimitar':
        {
            name:'Smith Adamant Scimitar',
            intervalSeconds:5,
            requirements:[
                new ItemRequirement({id:'adamantite_bar', amount:2}),
                new SkillRequirement({id: 'smithing', exp: getExpFromLevel(75)})
            ],
            rewards:[
                new ItemReward({id: 'adamant_scimitar', amount: 1}),
                new SkillReward({id: 'smithing', exp: 125})
            ],
            costs:[
                new ItemCost({id:'adamantite_bar', amount:2}),
            ]
        },
    'smithing_runite_bar':
        {
            name:'Smelt Runite Bar',
            intervalSeconds:5,
            requirements:[
                new ItemRequirement({id:'runite_ore', amount:1}),
                new ItemRequirement({id:'coal_ore', amount:8}),
                new SkillRequirement({id: 'smithing', exp: getExpFromLevel(85)})
            ],
            rewards:[
                new ItemReward({id: 'runite_bar', amount: 1}),
                new SkillReward({id: 'smithing', exp: 50})
            ],
            costs:[
                new ItemCost({id:'runite_ore', amount:1}),
                new ItemCost({id:'coal_ore', amount:8}),
            ]
        },
    'smithing_rune_dagger':
        {
            name:'Smith Rune Dagger',
            intervalSeconds:5,
            requirements:[
                new ItemRequirement({id:'rune_bar', amount:1}),
                new SkillRequirement({id: 'smithing', exp: getExpFromLevel(85)})
            ],
            rewards:[
                new ItemReward({id: 'rune_dagger', amount: 1}),
                new SkillReward({id: 'smithing', exp: 75})
            ],
            costs:[
                new ItemCost({id:'rune_bar', amount:1}),
            ]
        },
    'smithing_rune_scimitar':
        {
            name:'Smith Rune Scimitar',
            intervalSeconds:5,
            requirements:[
                new ItemRequirement({id:'rune_bar', amount:2}),
                new SkillRequirement({id: 'smithing', exp: getExpFromLevel(90)})
            ],
            rewards:[
                new ItemReward({id: 'rune_scimitar', amount: 1}),
                new SkillReward({id: 'smithing', exp: 150})
            ],
            costs:[
                new ItemCost({id:'rune_bar', amount:2}),
            ]
        },
}