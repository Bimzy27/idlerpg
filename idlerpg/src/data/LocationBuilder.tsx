import {ILocation} from "../models/Location";

interface ILocationBuilder
{
    [id:string]:ILocation
}

const locationBuilder:ILocationBuilder =
    {
        'location_lumberton':
            {
                name: 'Lumberton',
                skillIds: [ 'cooking', 'smithing', 'firemaking', 'fletching', 'crafting' ],
                taskIds: [ 'fishing_shrimp_raw', 'fishing_sardine_raw', 'fishing_herring_raw', 'mining_tin_ore', 'mining_copper_ore', 'woodcutting_normal_log' ],
                vendorIds: [ 'vendor_lumberton' ],
                enemyIds: [ 'chicken', 'cow' ],
                coord: {x: 1150, y: 500},
            },
        'location_faldomere':
            {
                name: 'Faldomere',
                skillIds: [ 'cooking', 'smithing', 'firemaking', 'fletching', 'crafting' ],
                taskIds: [ 'mining_iron_ore', 'mining_coal_ore', 'woodcutting_oak_log' ],
                vendorIds: [ 'vendor_faldomere' ],
                enemyIds: [ 'rat' ],
                coord: {x: 1300, y: 350},
            },
        'location_goblin_meadows':
            {
                name: 'Goblin Meadows',
                skillIds: [ ],
                taskIds: [ ],
                vendorIds: [ ],
                enemyIds: [ 'goblin', 'goblin_archer', 'goblin_mage' ],
                coord: {x: 800, y: 560},
            },
    };

export default locationBuilder;