import {IItem} from "../../models/Item";

interface IItemBuilder
{
    [id:string]:IItem
}

const itemBuilder:IItemBuilder =
    {
        //Weapons
        'bronze_dagger':
            {
                name:'Bronze Dagger',
                value:50,
            },
        'bronze_scimitar':
            {
                name:'Bronze Scimitar',
                value:50,
            },

        //Ranged
        'normal_shortbow':
            {
                name:'Normal Shortbow',
                value:50,
            },
        'bronze_arrow':
            {
                name:'Bronze Arrow',
                value:3,
            },
        'iron_arrow':
            {
                name:'Iron Arrow',
                value:8,
            },

        //Woodcutting
        'normal_log':
            {
                name:'Normal Log',
                value:3,
            },
        'oak_log':
            {
                name:'Oak Log',
                value:8,
            },
        'willow_log':
            {
                name:'Willow Log',
                value:16,
            },
        'maple_log':
            {
                name:'Maple Log',
                value:16,
            },
        'yew_log':
            {
                name:'Yew Log',
                value:16,
            },
        'magic_log':
            {
                name:'Magic Log',
                value:16,
            },
        'redwood_log':
            {
                name:'Redwood Log',
                value:16,
            },

        //Mining
        'copper_ore':
            {
                name:'Copper Ore',
                value:3,
            },
        'tin_ore':
            {
                name:'Tin Ore',
                value:3,
            },
        'iron_ore':
            {
                name:'Iron Ore',
                value:3,
            },
        'silver_ore':
            {
                name:'Silver Ore',
                value:3,
            },
        'coal_ore':
            {
                name:'Coal Ore',
                value:3,
            },
        'gold_ore':
            {
                name:'Gold Ore',
                value:3,
            },
        'mithril_ore':
            {
                name:'Mithril Ore',
                value:3,
            },
        'adamantite_ore':
            {
                name:'Adamantite Ore',
                value:3,
            },
        'runite_ore':
            {
                name:'Runite Ore',
                value:3,
            },

        //smithing
        'bronze_bar':
            {
                name:'Bronze Bar',
                value:3,
            },
        'iron_bar':
            {
                name:'Iron Bar',
                value:3,
            },
        'silver_bar':
            {
                name:'Silver Bar',
                value:3,
            },
        'steel_bar':
            {
                name:'Steel Bar',
                value:3,
            },
        'gold_bar':
            {
                name:'Gold Bar',
                value:3,
            },
        'mithril_bar':
            {
                name:'Mithril Bar',
                value:3,
            },
        'adamantite_bar':
            {
                name:'Adamantite Bar',
                value:3,
            },
        'runite_bar':
            {
                name:'Runite Bar',
                value:3,
            },
    };

export default itemBuilder;