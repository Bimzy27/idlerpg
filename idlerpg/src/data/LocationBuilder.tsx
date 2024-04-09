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
                taskIds: [ 'woodcutting_chop_normal', 'woodcutting_chop_oak' ]
            },
    };

export default locationBuilder;