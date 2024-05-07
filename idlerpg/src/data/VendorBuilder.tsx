import {ILocation} from "../models/Location";
import {IVendor} from "../models/Vendor";

interface IVendorBuilder
{
    [id:string]:IVendor
}

const Builder:IVendorBuilder =
    {
        'location_lumberton':
            {
                name: 'Lumberton',
                skillIds: [ 'cooking', 'smithing', 'firemaking', 'fletching', 'crafting' ],
                taskIds: [ 'fishing_shrimp_raw', 'mining_tin_ore', 'mining_copper_ore', 'woodcutting_normal_log' ],
                enemyIds: [ 'chicken', 'cow' ]
            },
        'location_faldomere':
            {
                name: 'Faldomere',
                skillIds: [ 'cooking', 'smithing', 'firemaking', 'fletching', 'crafting' ],
                taskIds: [ 'mining_iron_ore', 'mining_coal_ore', 'woodcutting_oak_log' ],
                enemyIds: [ 'goblin' ]
            },
    };

export default locationBuilder;