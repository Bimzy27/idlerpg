import {IItem} from "../models/Item";

interface IItemBuilder
{
    [id:string]:IItem
}

const itemBuilder:IItemBuilder =
    {
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
    };

export default itemBuilder;