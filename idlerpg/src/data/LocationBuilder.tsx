import {ILocation} from "../models/Location";

interface ILocationBuilder
{
    [id:string]:ILocation
}

const locationBuilder:ILocationBuilder =
    {
        //Ranged
        'location_lumberton':
            {
                name: 'Lumberton',
                taskIds: [ 'woodcutting_chop_normal', 'woodcutting_chop_oak', 'woodcutting_chop_willow', 'woodcutting_chop_maple', 'woodcutting_chop_yew', 'woodcutting_chop_magic', 'woodcutting_chop_redwood',
                    'mining_pick_copper', 'mining_pick_tin', 'mining_pick_iron', 'mining_pick_silver', 'mining_pick_coal', 'mining_pick_gold', 'mining_pick_mithril', 'mining_pick_adamantite', 'mining_pick_runite',]
            },
    };

export default locationBuilder;