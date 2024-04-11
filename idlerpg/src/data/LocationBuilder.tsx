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
                taskIds: [ ]
            },
    };

export default locationBuilder;